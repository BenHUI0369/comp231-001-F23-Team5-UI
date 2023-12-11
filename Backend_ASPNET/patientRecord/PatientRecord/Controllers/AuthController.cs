using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MySql.Data.MySqlClient;
using PatientRecord.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace PatientRecord.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{ 
    public static User user = new User();
    private readonly IConfiguration _configuration;

    string connectionString = "Server=localhost;Port=3306;Database=mytestdb;User=root;Password=P@ss1234@$;";

    public AuthController(IConfiguration config)
    {
        _configuration = config;
    }

    [HttpPost("register")]
    public async Task<ActionResult<User>> Register(UserDto request)
    {

        using (MySqlConnection connection = new MySqlConnection(connectionString))
        {
            await connection.OpenAsync();
            using (MySqlCommand command = new MySqlCommand("SELECT COUNT(*) FROM Users WHERE Username = @Username", connection))
            {
                command.Parameters.AddWithValue("@Username", request.Username);

                int existingUserCount = Convert.ToInt32(await command.ExecuteScalarAsync());

                if (existingUserCount > 0)
                {
                    return BadRequest("Username already exists");
                }
            }

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            using (MySqlCommand insertCommand = new MySqlCommand("INSERT INTO Users (Username, PasswordHash, PasswordSalt) VALUES (@Username, @PasswordHash, @PasswordSalt)", connection))
            {
                insertCommand.Parameters.AddWithValue("@Username", request.Username);
                insertCommand.Parameters.AddWithValue("@PasswordHash", passwordHash);
                insertCommand.Parameters.AddWithValue("@PasswordSalt", passwordSalt);

                await insertCommand.ExecuteNonQueryAsync();
            }
        }

        return Ok("Registration successful");
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login(UserDto request)
    {
        using (MySqlConnection connection = new MySqlConnection(connectionString))
        {
            await connection.OpenAsync();

            using (MySqlCommand command = new MySqlCommand("SELECT Username, PasswordHash, PasswordSalt FROM Users WHERE Username = @Username", connection))
            {
                command.Parameters.AddWithValue("@Username", request.Username);

                using (MySqlDataReader reader = (MySqlDataReader)await command.ExecuteReaderAsync())
                {
                    if (!reader.Read())
                    {
                        return BadRequest("User not found");
                    }

                    string storedUsername = reader.GetString(0);
                    byte[] storedHash = (byte[])reader["PasswordHash"];
                    byte[] storedSalt = (byte[])reader["PasswordSalt"];

                    if (!VerifyPasswordHash(request.Password, storedHash, storedSalt))
                    {
                        return BadRequest("Invalid password");
                    }

                    string token = CreateToken(user);

                    return Ok(token);
                }
            }
        }
    }

    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using(var hmac = new HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }
    }

    private bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
    {
        using (var hmac = new HMACSHA512(storedSalt))
        {
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(storedHash);
        }
    }

    private string CreateToken(User user)
    {
        List<Claim> claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Username)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JwtSettings:Key").Value));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(3),
            signingCredentials: creds);
        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }

}

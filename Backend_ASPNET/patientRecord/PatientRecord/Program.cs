using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using PatientRecord.Services.PatientRecords;
using System.Configuration;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
{
    var config = builder.Configuration;
    builder.Services.AddControllers();
    builder.Services.AddScoped<IPatientRecordSevice, PatientRecordService>();
    /*
    builder.Services.AddAuthentication(x =>
    {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(x =>
    {
        x.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("JwtSettings:Key").Value)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
    builder.Services.AddAuthorization();
    */
}

var app = builder.Build();

{
    // add an exception handler, 
    app.UseExceptionHandler("/error");
    app.UseHttpsRedirection();
    //app.UseAuthentication();
    //app.UseAuthorization();
    app.MapControllers();
    app.Run();
}


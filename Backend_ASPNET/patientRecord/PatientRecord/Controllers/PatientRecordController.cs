using ErrorOr;
using Microsoft.AspNetCore.Mvc;
using PatientRecord.Contract.PatientRecord;
using PatientRecord.Models;
using PatientRecord.Services.PatientRecords;
using PatientRecord.ServicesErrors;
using MySql.Data.MySqlClient;
using Dapper;
using Microsoft.AspNetCore.Authorization;

namespace PatientRecord.Controllers;

//[Authorize]
public class PatientRecordController : ApiController
{
    private readonly IPatientRecordSevice _patientRecordService;

    public PatientRecordController(IPatientRecordSevice patientRecordService)
    {
       _patientRecordService = patientRecordService; 
    }

    [HttpPost()]
    public IActionResult CreatePatientRecord(CreatePatientRecordRequest request)
    {
        var patientRecode = new Record(
            Guid.NewGuid(),
            request.firstName,
            request.lastName,
            request.dateOfBirth,
            request.gender,
            request.contactEmail,
            request.contactPhone,
            request.contactStreet,
            request.contactCity,
            request.contactState,
            request.contactPostalCode
        );

        // TODO save the record to database
        ErrorOr<Created> createRecordResult = _patientRecordService.CreatePatientRecord(patientRecode);

        return createRecordResult.Match(
            created => CreatedAsGetRecord(patientRecode),
            errors => Problem(errors)
        );
    }

    [HttpGet("{id:guid}")]
    public IActionResult GetPatientRecord(Guid id)
    {
        /*
        ErrorOr<Record> getRecordResult = _patientRecordService.GetRecord(id);

        return getRecordResult.Match(
            record => Ok(MapRecordResponse(record)),
            errors => Problem(errors)
        );
        */

        
        string connectionString = "Server=localhost;Port=3306;Database=mytestdb;User=root;Password=P@ss1234@$;";

        using (MySqlConnection connection = new MySqlConnection(connectionString))
        {
            // Define your SQL query to select FirstName, LastName, and Gender by Pid
            string sql = @"SELECT Id, FirstName, LastName, DateOfBirth, Gender, 
                  ContactEmail, ContactPhone, ContactStreet, ContactCity, ContactState, ContactPostalCode
                  FROM Records WHERE Id = @Id";

            // Execute the query and pass the id parameter
            var result = connection.QueryFirstOrDefault<Record>(sql, new { Id = id });

            if (result != null)
            {
                // Use the MapRecordResponse function to map the selected fields
                var response = MapRecordResponse(result);

                return Ok(response);
            }
            else
            {
                return NotFound(); // Record not found
            }
        }
    }

    [HttpPut("{id:guid}")]
    public IActionResult UpsertPatientRecord(Guid id, UpsertPatientRecordRequest request)
    {
        var patientRecode = new Record(
            id,
            request.firstName,
            request.lastName,
            request.dateOfBirth,
            request.gender,
            request.contactEmail,
            request.contactPhone,
            request.contactStreet,
            request.contactCity,
            request.contactState,
            request.contactPostalCode
        );

        ErrorOr<UpsertedRecord> upsertRecordResult = _patientRecordService.UpsertPatientRecord(patientRecode);
        UpdateDataBase(patientRecode);
        // TODO: return 201 if new patient record was created


        return upsertRecordResult.Match(
            upserted => upserted.IsNewlyCreated? CreatedAsGetRecord(patientRecode) : NoContent(),
            errors => Problem(errors)
        );
    }

    [HttpDelete("{id:guid}")]
    public IActionResult DeletePatientRecord(Guid id)
    {
        ErrorOr<Deleted> deleteRecordResult = _patientRecordService.DeletePatientRecord(id);
        DeleteDataBase(id);

        return deleteRecordResult.Match(
            deleted => NoContent(),
            errors => Problem(errors)
        );
    }

    private static PatientRecordRsponse MapRecordResponse(Record patientRecode)
    {
        return new PatientRecordRsponse(
        patientRecode.Id,
        patientRecode.FirstName,
        patientRecode.LastName,
        patientRecode.DateOfBirth,
        patientRecode.Gender,
        patientRecode.ContactEmail,
        patientRecode.ContactPhone,
        patientRecode.ContactStreet,
        patientRecode.ContactCity,
        patientRecode.ContactState,
        patientRecode.ContactPostalCode
        );
    }

        private IActionResult CreatedAsGetRecord(Record patientRecode)
    {
        InsertIntoDataBase(patientRecode);

        return CreatedAtAction(
            actionName: nameof(GetPatientRecord),
            routeValues: new { id = patientRecode.Id },
            value: MapRecordResponse(patientRecode));
    }

    private void InsertIntoDataBase(Record patientRecode)
    {
        try
        {
            string connectionString = "Server=localhost;Port=3306;Database=mytestdb;User=root;Password=P@ss1234@$;";

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                // Create an SQL query to insert data into your MySQL table (replace TableName with your actual table name)
                string insertQuery = "INSERT INTO Records (Id, FirstName, LastName, DateOfBirth, Gender, ContactEmail, ContactPhone, ContactStreet, ContactCity, ContactState, ContactPostalCode) VALUES (@id, @firstName, @lastName, @dateOfBirth, @gender, @email, @phone, @street, @city, @state, @postalCode)";

                using (MySqlCommand cmd = new MySqlCommand(insertQuery, connection))
                {
                    // Replace parameter names and types with your actual database column names and types
                    cmd.Parameters.AddWithValue("@id", patientRecode.Id);
                    cmd.Parameters.AddWithValue("@firstName", patientRecode.FirstName);
                    cmd.Parameters.AddWithValue("@lastName", patientRecode.LastName);
                    cmd.Parameters.AddWithValue("@dateOfBirth", patientRecode.DateOfBirth);
                    cmd.Parameters.AddWithValue("@gender", patientRecode.Gender);
                    cmd.Parameters.AddWithValue("@email", patientRecode.ContactEmail);
                    cmd.Parameters.AddWithValue("@phone", patientRecode.ContactPhone);
                    cmd.Parameters.AddWithValue("@street", patientRecode.ContactStreet);
                    cmd.Parameters.AddWithValue("@city", patientRecode.ContactCity);
                    cmd.Parameters.AddWithValue("@state", patientRecode.ContactState);
                    cmd.Parameters.AddWithValue("@postalCode", patientRecode.ContactPostalCode);
                    
                    // ...

                    // Execute the SQL query to insert the data
                    cmd.ExecuteNonQuery();
                    connection.Close();
                }

                Console.WriteLine("Patient information Created!");
            }
        }
        catch (Exception err)
        {
            Console.WriteLine(err.Message);
        }
    }

    private void UpdateDataBase(Record patientRecode)
    {
        try
        {
            string connectionString = "Server=localhost;Port=3306;Database=mytestdb;User=root;Password=P@ss1234@$;";

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                // Create an SQL query to insert data into your MySQL table (replace TableName with your actual table name)
                string insertQuery = "UPDATE Records SET FirstName = @firstName, LastName = @lastName, DateOfBirth = @dateOfBirth, Gender = @gender, ContactEmail = @email, ContactPhone = @phone, ContactStreet = @street, ContactCity = @city, ContactState = @state, ContactPostalCode = @postalCode WHERE Id = @id";

                using (MySqlCommand cmd = new MySqlCommand(insertQuery, connection))
                {
                    // Replace parameter names and types with your actual database column names and types
                    cmd.Parameters.AddWithValue("@id", patientRecode.Id);
                    cmd.Parameters.AddWithValue("@firstName", patientRecode.FirstName);
                    cmd.Parameters.AddWithValue("@lastName", patientRecode.LastName);
                    cmd.Parameters.AddWithValue("@dateOfBirth", patientRecode.DateOfBirth);
                    cmd.Parameters.AddWithValue("@gender", patientRecode.Gender);
                    cmd.Parameters.AddWithValue("@email", patientRecode.ContactEmail);
                    cmd.Parameters.AddWithValue("@phone", patientRecode.ContactPhone);
                    cmd.Parameters.AddWithValue("@street", patientRecode.ContactStreet);
                    cmd.Parameters.AddWithValue("@city", patientRecode.ContactCity);
                    cmd.Parameters.AddWithValue("@state", patientRecode.ContactState);
                    cmd.Parameters.AddWithValue("@postalCode", patientRecode.ContactPostalCode);
                    // ...

                    // Execute the SQL query to insert the data
                    cmd.ExecuteNonQuery();
                }

                Console.WriteLine("Patient information Updated!");
            }
        }
        catch (Exception err)
        {
            Console.WriteLine(err.Message);
        }
    }

    private void DeleteDataBase(Guid id)
    {
        try
        {
            string connectionString = "Server=localhost;Port=3306;Database=mytestdb;User=root;Password=P@ss1234@$;";

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                // Create an SQL query to insert data into your MySQL table (replace TableName with your actual table name)
                string insertQuery = "DELETE FROM Records WHERE Id = @id";

                using (MySqlCommand cmd = new MySqlCommand(insertQuery, connection))
                {
                    // Replace parameter names and types with your actual database column names and types
                    cmd.Parameters.AddWithValue("@id", id);
                    // ...

                    // Execute the SQL query to insert the data
                    cmd.ExecuteNonQuery();
                }

                Console.WriteLine("Patient information Deleted!");
            }
        }
        catch (Exception err)
        {
            Console.WriteLine(err.Message);
        }
    }

}
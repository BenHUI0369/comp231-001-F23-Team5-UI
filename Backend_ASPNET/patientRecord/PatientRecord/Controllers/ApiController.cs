using ErrorOr;
using Microsoft.AspNetCore.Mvc;

namespace PatientRecord.Controllers;

// all base controller for other controller
[ApiController]
[Route("patientrecords")]
public class ApiController : ControllerBase
{
    protected IActionResult  Problem(List<Error> errors)
    {
        var firstError = errors[0];

        var statusCode = firstError.Type switch
        {
            ErrorType.NotFound => StatusCodes.Status404NotFound,
            ErrorType.Validation => StatusCodes.Status400BadRequest,
            ErrorType.Conflict => StatusCodes.Status409Conflict,
            _ => StatusCodes.Status500InternalServerError
        };

        return Problem(statusCode: statusCode, title: firstError.Description);
    }
}
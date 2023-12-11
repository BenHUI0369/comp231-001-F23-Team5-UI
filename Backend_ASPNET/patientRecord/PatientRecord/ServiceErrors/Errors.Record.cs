using ErrorOr;

namespace PatientRecord.ServicesErrors;

public static class Errors
{
    public static class Record
    {
        // Error that not found any record
        public static Error NotFound => Error.NotFound(
            code: "Record.NotFound",
            description: "Record not found"
        );
    }
}
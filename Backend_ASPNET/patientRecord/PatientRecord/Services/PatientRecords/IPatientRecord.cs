using ErrorOr;
using PatientRecord.Models;

namespace PatientRecord.Services.PatientRecords;

public interface IPatientRecordSevice
{
    ErrorOr<Created> CreatePatientRecord(Record request);
    ErrorOr<Deleted> DeletePatientRecord(Guid id);
    ErrorOr<Record> GetRecord(Guid id);
    ErrorOr<UpsertedRecord> UpsertPatientRecord(Record patientRecode);
}
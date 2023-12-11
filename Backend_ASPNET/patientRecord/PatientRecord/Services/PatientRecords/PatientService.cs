using ErrorOr;
using PatientRecord.Models;
using PatientRecord.ServicesErrors;

namespace PatientRecord.Services.PatientRecords;

public class PatientRecordService : IPatientRecordSevice
{
    private static readonly Dictionary<Guid, Record> _patientRecord = new();
    public ErrorOr<Created> CreatePatientRecord(Record record)
    {
        _patientRecord.Add(record.Id, record);
        return Result.Created;
    }

    public ErrorOr<Deleted> DeletePatientRecord(Guid id)
    {
        _patientRecord.Remove(id);
        return Result.Deleted;
    }

    public ErrorOr<Record> GetRecord(Guid id)
    {
        if (_patientRecord.TryGetValue(id, out var record))
        {
            return record;
        }
        return Errors.Record.NotFound;
    }

    public ErrorOr<UpsertedRecord> UpsertPatientRecord(Record patientRecode)
    {
        var isNewlyCreated = !_patientRecord.ContainsKey(patientRecode.Id);
        _patientRecord[patientRecode.Id] = patientRecode;
        return new UpsertedRecord(isNewlyCreated);
    }
}
namespace PatientRecord.Contract.PatientRecord;
public record UpsertPatientRecordRequest(
    string firstName,
    string lastName,
    DateTime dateOfBirth,
    string gender,
    string contactEmail,
    string contactPhone,
    string contactStreet,
    string contactCity,
    string contactState,
    string contactPostalCode
);
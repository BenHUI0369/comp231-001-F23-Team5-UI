namespace PatientRecord.Contract.PatientRecord;
public record CreatePatientRecordRequest(
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
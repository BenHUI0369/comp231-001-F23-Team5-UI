using PatientRecord.Contract.PatientRecord;
using ErrorOr;

namespace PatientRecord.Models;

/*
public class Record
{
    public Guid Id { get; }
    public string FirstName { get; }
    public string LastName { get; }
    public string DateOfBirth { get; }
    public string Gender { get; }
    public Contact ContactInformation { get; }
    public MedicalHistory[] MedicalHistory { get; }

    public Record(
        Guid id,
        string fName,
        string lName,
        string birthday,
        string gender,
        Contact contactInformation,
        MedicalHistory[] medicalHistory
    )
    {
        // emforce invariants
        Id = id;
        FirstName = fName;
        LastName = lName;
        DateOfBirth = birthday;
        Gender = gender;
        ContactInformation = contactInformation;
        MedicalHistory = medicalHistory;
    }
}
*/

public class Record
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Gender { get; set; }
    public string ContactEmail { get; set; }
    public string ContactPhone { get; set; }
    public string ContactStreet { get; set; }
    public string ContactCity { get; set; }
    public string ContactState { get; set; }
    public string ContactPostalCode { get; set; }
    public Record(
        Guid id,
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
    )
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
        DateOfBirth = dateOfBirth;
        Gender = gender;
        ContactEmail = contactEmail;
        ContactPhone = contactPhone;
        ContactStreet = contactStreet;
        ContactCity = contactCity;
        ContactState = contactState;
        ContactPostalCode = contactPostalCode;
    }

    public static ErrorOr<Record> Create(
        string firstName,
        string lastName,
        DateTime dateOfBirth,
        string gender,
        string contactEmail,
        string contactPhone,
        string contactStreet,
        string contactCity,
        string contactState,
        string contactPostalCode)
    {
        return new Record(
            Guid.NewGuid(),
            firstName,
            lastName,
            dateOfBirth,
            gender,
            contactEmail,
            contactPhone,
            contactStreet,
            contactCity,
            contactState,
            contactPostalCode);
    }
    
}
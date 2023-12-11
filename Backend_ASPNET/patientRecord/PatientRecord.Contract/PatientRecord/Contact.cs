namespace PatientRecord.Contract.PatientRecord;

public class Contact
{
    public string Email { get; set; }
    public string Phone { get; set; }
    public Address Address { get; set; }

    public Contact( string email, string phone, Address address) {
        Email = email;
        Phone = phone;
        Address = address;
    }
}
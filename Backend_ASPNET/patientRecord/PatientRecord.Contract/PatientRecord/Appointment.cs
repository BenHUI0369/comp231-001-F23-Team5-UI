namespace PatientRecord.Contract.PatientRecord;

public class Appointment{
    public DateTime Date { get; set; }
    public string Doctor { get; set; }
    public string Notes { get; set; }

    public Appointment(DateTime date, string doctor, string notes)
    {
        Date = date;
        Doctor = doctor;
        Notes = notes;
    }
}
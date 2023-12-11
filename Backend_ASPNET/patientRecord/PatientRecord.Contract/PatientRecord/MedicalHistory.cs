namespace PatientRecord.Contract.PatientRecord;

public class MedicalHistory {
    public string Allergies { get; set; }
    public string Conditions { get; set; }
    public string Medications { get; set; }
    public MedicalHistory(string allergies, string conditions, string medications){
        Allergies = allergies;
        Conditions = conditions;
        Medications = medications;
    }
}
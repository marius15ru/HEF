namespace HEF_API.Models
{
    public class SubJob
    {
        public int Id { get; set; }
        //Foreign keys
        public int JobId { get; set; }
        public int EquipmentId { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public Enums.JobStatus Status { get; set; }
        public Enums.Unit Unit { get; set; }
        public double Value { get; set; }
    }
}

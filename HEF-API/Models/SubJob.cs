namespace HEF_API.Models
{
    public class SubJob
    {
        public string Id { get; set; }
        //Foreign keys
        public int JobId { get; set; }
        public Job Job { get; set; }
        public int EquipmentId { get; set; }
        public Equipment Equipment { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public Enums.JobStatus Status { get; set; }
        public Enums.Unit Unit { get; set; }
        public int Value { get; set; }
    }
}

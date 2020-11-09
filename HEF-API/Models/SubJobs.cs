using System;
namespace HEF_API.Models
{
    public class SubJobs
    {
        public string Id { get; set; }
        //Foreign keys
        public Job JobId { get; set; }
        public Equipment EquipmentId { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public Enums.JobStatus Status { get; set; }
        public Enums.Unit Unit { get; set; }
        public int Value { get; set; }
    }
}

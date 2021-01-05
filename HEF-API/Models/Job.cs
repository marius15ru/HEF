using System;

namespace HEF_API.Models
{
    public class Job
    {
        public int Id { get; set; }
        //Foreign keys
        public int StationId { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public int Status { get; set; }
        public DateTime? CompleteBy { get; set; }
        public Enums.Recurring Recurring { get; set; }
        public string Duration { get; set; }
        public bool EmergencyJob { get; set; }
        public bool HasComments { get; set; }
        public DateTime? LastCheck { get; set; }

        public virtual Station Station { get; set; }
    }
}

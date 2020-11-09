using System;
namespace HEF_API.Models
{
    public class Job
    {
        public int Id { get; set; }
        //Foreign keys
        public Station StationId { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public Enums.JobStatus Status { get; set; }
        public DateTime CompleteBy { get; set; }
        public bool Recurring { get; set; }
        public string Duration { get; set; }
        public bool EmergencyJob { get; set; }
        public bool HasComments { get; set; }
        public DateTime LastCheck { get; set; }
    }
}

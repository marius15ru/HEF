using System;
namespace HEF_API.Models
{
    public interface IJob
    {
        int Id { get; set; }
        //Foreign keys
        Station StationId { get; set; }

        string Name { get; set; }
        string Description { get; set; }
        Enums.JobStatus Status { get; set; }
        DateTime CompleteBy { get; set; }
        bool Recurring { get; set; }
        string Duration { get; set; }
        bool EmergencyJob { get; set; }
        bool HasComments { get; set; }
        DateTime LastCheck { get; set; }
    }

    public class Job: IJob
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

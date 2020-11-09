using System;
namespace HEF_API.Models
{
    public class Job_Assignments
    {
        public int Id { get; set; }
        public Job JobId { get; set; }
        public User UserId { get; set; }
    }
}

namespace HEF_API.Models
{
    public class Job_Assignments
    {
        public int JobId { get; set; }
        public Job Job { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}

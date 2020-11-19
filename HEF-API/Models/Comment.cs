namespace HEF_API.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int JobId { get; set; }
        public Job Job { get; set; }
        public string Text { get; set; }
        public bool Seen { get; set; }
    }
}

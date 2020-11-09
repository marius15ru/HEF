using System;
namespace HEF_API.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public User UserId { get; set; }
        public Job JobId { get; set; }
        public string Text { get; set; }
        public bool Seen { get; set; }
    }
}

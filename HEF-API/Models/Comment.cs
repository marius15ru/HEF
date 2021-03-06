﻿namespace HEF_API.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int JobId { get; set; }
        public string Text { get; set; }
        public bool Seen { get; set; }

        public virtual User User { get; set; }
        public virtual Job Job { get; set; }
    }
}

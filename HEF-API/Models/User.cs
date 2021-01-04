namespace HEF_API.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Enums.Role Role { get; set; }
        public Enums.UserStatus Status { get; set; }
    }
}

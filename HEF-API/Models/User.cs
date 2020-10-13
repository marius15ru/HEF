using System;
namespace myApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public WorkOrder WorkOrderId { get; set; }

        public string Name { get; set; }
        public Enums.Role Role { get; set; }
        public Enums.UserStatus Status { get; set; }
    }
}

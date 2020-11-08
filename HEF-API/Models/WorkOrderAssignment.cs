using System;
namespace HEF_API.Models
{
    public class WorkOrderAssignment
    {
        public WorkOrder WorkOrderId { get; set; }
        public User UserId { get; set; }
    }
}

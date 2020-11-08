using System;
namespace HEF_API.Models
{
    public class WorkOrder
    {
        public int Id { get; set; }
        //Foreign keys
        public Plant PlantId { get; set; }
        public Location LocationId { get; set; }

        public string Name { get; set; }
        public Enums.WorkOrderStatus Status { get; set; }
        public Enums.TimeFrame TimeFrame { get; set; }
        public string Duration { get; set; }
        public DateTime CompleteBy { get; set; }
        public bool EmergencyJob { get; set; }
        public bool HasComments { get; set; }
        public DateTime LastCheck { get; set; }
    }
}

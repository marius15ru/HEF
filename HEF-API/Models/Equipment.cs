using System;
namespace myApp.Models
{
    public class Equipment
    {
        public int Id { get; set; }
        
        //Foreign keys
        public WorkOrder WorkOrderId { get; set; }
        public Equipment EquipmentId { get; set; }
        public Location LocationId { get; set; }

        public string Name { get; set; }
        public string Model { get; set; }
        public string Manifacturer { get; set; }
        public Enums.Task Task { get; set; }
        public DateTime LastCheck { get; set; }
    }
}

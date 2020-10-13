using System;
namespace myApp.Models
{
    public class Plant
    {
        public int Id { get; set; }
        //Foreign keys
        public WorkOrder WorkOrderId { get; set; }
        public Equipment EquipmentId { get; set; }
        public Location LocationId { get; set; }


        public string Name { get; set; }
        public string Role { get; set; }
        public Enums.PlantType PlantType { get; set; }
    }
}

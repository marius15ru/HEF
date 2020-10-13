using System;
namespace myApp.Models
{
    public class SubWorkOrder
    {
        public string Id { get; set; }
        //Foreign keys
        public WorkOrder WorkOrderId { get; set; }
        public User UserId { get; set; }
        public Equipment EquipmentId { get; set; }
        public Location LocationId { get; set; }


        public string Name { get; set; }
        public Enums.WorkOrderStatus Status { get; set; }
        public string Duration { get; set; }
        public string Description { get; set; }
        public string Comment { get; set; }
        public int Measurement { get; set; }
        public Enums.MeasurementType MeasurementType { get; set }
        public bool Delay { get; set; }
    }
}

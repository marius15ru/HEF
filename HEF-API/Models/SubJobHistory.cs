using System;

namespace HEF_API.Models
{
    public class SubJobHistory
    {
        public int Id { get; set; }
        //Foreign keys
        public int JobId { get; set; }
        public int EquipmentId { get; set; }

        public string Description { get; set; }
        public int Status { get; set; }
        public int Unit { get; set; }
        public double Value { get; set; }
        public int SubJobTask { get; set; }
        public DateTime? CompletedOn { get; set; }
    }
}

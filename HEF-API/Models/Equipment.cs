using System;
namespace HEF_API.Models
{
    public class Equipment
    {
        public int Id { get; set; }
        
        //Foreign keys
        public Location LocationId { get; set; }

        public string Name { get; set; }
        public string Model { get; set; }
        public string Manufacturer { get; set; }
        public Enums.Task Task { get; set; }
        public DateTime LastCheck { get; set; }
    }
}

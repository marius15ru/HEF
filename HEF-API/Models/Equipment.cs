using System;

namespace HEF_API.Models
{
    public class Equipment
    {
        public int Id { get; set; }

        //Foreign keys
        public int StationId { get; set; }

        public string Name { get; set; }
        public DateTime? Model { get; set; }
        public string Manufacturer { get; set; }
        public string Operation { get; set; }
        public DateTime? LastCheck { get; set; }
    }
}

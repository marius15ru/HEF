using System;
namespace HEF_API.Models
{
    public class Station
    {
        public int Id { get; set; }
        //Foreign keys
        public Plant PlantId { get; set; }
        public Area AreaId { get; set; }

        public string Name { get; set; }
        public string Address { get; set; }
        public string Coordinates { get; set; }
        public string StationPrecise { get; set; }
        public string Description { get; set; }
    }
}

using System;
namespace HEF_API.Models
{
    public class Location
    {
        public int Id { get; set; }
        //Foreign keys
        public Plant PlantId { get; set; }

        public string Name { get; set; }
        public string Address { get; set; }
        public string PostCode { get; set; }
        public string CoOrdinates { get; set; }
        public string PreciseLocation { get; set; }
    }
}

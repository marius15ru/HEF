using System.Collections.Generic;

namespace HEF_API.Models
{
    public class Station
    {
        public int Id { get; set; }
        //Foreign keys
        public int PlantId { get; set; }
        public int AreaId { get; set; }

        public string Name { get; set; }
        public string Address { get; set; }
        public string Coordinates { get; set; }
        public string LocationPrecise { get; set; }
        public string Description { get; set; }
        public virtual Plant Plant { get; set; }
        public virtual Area Area { get; set; }
    }
}

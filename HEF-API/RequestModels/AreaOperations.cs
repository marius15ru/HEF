using HEF_API.Models;
using System.Collections.Generic;
using static HEF_API.Models.Enums;

namespace HEF_API.RequestModels
{
    public class AreaQuery
    {
        public DataOperation Action { get; set; }
    }

    public class AreaCommand
    {
        public Area Item { get; set; }
        public DataOperation Action { get; set; }
    }

    public class AreaResults
    {
        public List<Area> Items { get; set; }
        public Message Message { get; set; }
    }

    public class AreaSingleResult
    {
        public Area Item { get; set; }
        public Message Message { get; set; }
    }
}

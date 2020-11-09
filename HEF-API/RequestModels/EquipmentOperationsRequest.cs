using System;
using HEF_API.Models;
using static HEF_API.Models.Enums;

namespace HEF_API.RequestModels
{
    public class EquipmentOperationsRequest
    {
        public Equipment Item { get; set; }
        public DataOperation Action { get; set; }
    }
}

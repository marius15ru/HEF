using System;
using System.Collections.Generic;
using HEF_API.Models;

namespace HEF_API.RequestModels
{
    public class EquipmentOperationsResult
    {
        public List<Equipment> Items { get; set; }
        public Message Message { get; set; }
    }
}

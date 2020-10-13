using System;
using System.Collections.Generic;
using myApp.Models;

namespace myApp.RequestModels
{
    public class EquipmentOperationsResult
    {
        public List<Equipment> Items { get; set; }
        public Message Message { get; set; }
    }
}

using System;
using myApp.Models;
using static myApp.Models.Enums;

namespace myApp.RequestModels
{
    public class EquipmentOperationsRequest
    {
        public Equipment Item { get; set; }
        public DataOperation Action { get; set; }
    }
}

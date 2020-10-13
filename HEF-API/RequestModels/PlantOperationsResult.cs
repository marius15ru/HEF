using System;
using System.Collections.Generic;
using myApp.Models;

namespace myApp.RequestModels
{
    public class PlantOperationsResult
    {
        public List<Plant> Items { get; set; }
        public Message Message { get; set; }
    }
}

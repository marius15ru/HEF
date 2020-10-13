using System;
using System.Collections.Generic;
using myApp.Models;

namespace myApp.RequestModels
{
    public class LocationOperationsResult
    {
        public List<Location> Items { get; set; }
        public Message Message { get; set; }
    }
}

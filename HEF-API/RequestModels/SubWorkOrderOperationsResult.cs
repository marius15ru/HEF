using System;
using System.Collections.Generic;
using myApp.Models;

namespace myApp.RequestModels
{
    public class SubWorkOrderOperationsResult
    {
        public List<SubWorkOrder> Items { get; set; }
        public Message Message { get; set; }
    }
}

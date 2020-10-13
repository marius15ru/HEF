using System;
using System.Collections.Generic;
using myApp.Models;

namespace myApp.RequestModels
{
    public class WorkOrderOperationsResult
    {
        public List<WorkOrder> Items { get; set; }
        public Message Message { get; set; }
    }
}

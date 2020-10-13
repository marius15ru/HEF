using System;
using myApp.Models;
using static myApp.Models.Enums;

namespace myApp.RequestModels
{
    public class WorkOrderOperationsRequest
    {
        public WorkOrder Item { get; set; }
        public DataOperation Action { get; set; }
    }
}

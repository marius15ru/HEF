using System;
using myApp.Models;
using static myApp.Models.Enums;

namespace myApp.RequestModels
{
    public class SubWorkOrderOperationsRequest
    {
        public SubWorkOrder Item { get; set; }
        public DataOperation Action { get; set; }
    }
}

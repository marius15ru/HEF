using System;
using myApp.Models;
using static myApp.Models.Enums;

namespace myApp.RequestModels
{
    public class UserOperationsRequest
    {
        public User Item { get; set; }
        public DataOperation Action { get; set; }
    }
}

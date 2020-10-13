using System;
using System.Collections.Generic;
using myApp.Models;

namespace myApp.RequestModels
{
    public class UserOperationsResult
    {
        public List<User> Items { get; set; }
        public Message Message { get; set; }
    }
}

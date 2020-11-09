﻿using System;
using HEF_API.Models;
using static HEF_API.Models.Enums;

namespace HEF_API.RequestModels
{
    public class UserOperationsRequest
    {
        public User Item { get; set; }
        public DataOperation Action { get; set; }
    }
}

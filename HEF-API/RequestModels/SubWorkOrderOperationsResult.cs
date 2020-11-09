using System;
using System.Collections.Generic;
using HEF_API.Models;

namespace HEF_API.RequestModels
{
    public class SubJobOperationsResult
    {
        public List<SubJobs> Items { get; set; }
        public Message Message { get; set; }
    }
}

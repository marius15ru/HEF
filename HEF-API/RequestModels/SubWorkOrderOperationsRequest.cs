using System;
using HEF_API.Models;
using static HEF_API.Models.Enums;

namespace HEF_API.RequestModels
{
    public class SubJobOperationsRequest
    {
        public SubJobs Item { get; set; }
        public DataOperation Action { get; set; }
    }
}

using System;
namespace HEF_API.Models
{
    public class Message
    {
        public bool Ok { get; set; }
        public string Name { get; set; }
        public string Detail { get; set; }
        public string ErrorCode { get; set; }
        //public DataResult DataResult { get; set; }
    }
}

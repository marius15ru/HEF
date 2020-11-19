using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace HEF_API.Models
{
    public class Plant
    {
        public int Id { get; set; }
        //Foreign keys

        public string Name { get; set; }
    }
}

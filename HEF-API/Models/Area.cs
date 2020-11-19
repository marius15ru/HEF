using System.ComponentModel.DataAnnotations.Schema;

namespace HEF_API.Models
{
    public interface IArea
    {
        int Id { get; set; }
        string Name { get; set; }
    }

    public class Area: IArea
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}

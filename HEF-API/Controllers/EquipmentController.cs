using System.Collections.Generic;
using System.Threading.Tasks;
using HEF_API.Models;
using HEF_API.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HEF_API.Controllers
{
    [Route("api/equipments")]
    public class EquipmentController : ControllerBase
    {
        private readonly IServiceWrapper _service;

        public EquipmentController(IServiceWrapper service)
        {
            _service = service;
        }

        // GET: api/equipments?sortby=column
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Equipment>>> Get([FromQuery(Name = "sortby")] string sortBy)
        {
            return await _service.Equipment.GetAllEquipments(sortBy);
        }

        // GET api/equipments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Equipment>> Get(int id)
        {
            return await _service.Equipment.GetEquipmentById(id);
        }

        // POST api/equipments
        [HttpPost]
        public async Task<ActionResult<Equipment>> Post([FromBody] Equipment value)
        {
            await _service.Equipment.AddEquipment(value);
            return CreatedAtAction("Get", new { id = value.Id }, value);
        }

        // PUT api/equipments/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Equipment value)
        {
            await _service.Equipment.UpdateEquipment(id, value);
            return NoContent();
        }

        // DELETE api/equipments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _service.Equipment.RemoveEquipment(id);
            return NoContent();
        }
    }
}

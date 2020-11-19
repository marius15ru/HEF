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

        // GET: api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Equipment>>> Get()
        {
            return await _service.Equipment.GetAllEquipments();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Equipment>> Get(int id)
        {
            return await _service.Equipment.GetEquipmentById(id);
        }

        // POST api/values
        [HttpPost]
        public async Task Post([FromBody] Equipment value)
        {
            await _service.Equipment.AddEquipment(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] Equipment value)
        {
            await _service.Equipment.UpdateEquipment(id, value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.Equipment.RemoveEquipment(id);
        }
    }
}

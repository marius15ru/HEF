using System.Collections.Generic;
using System.Threading.Tasks;
using HEF_API.Models;
using HEF_API.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HEF_API.Controllers
{
    [Route("api/plants")]
    public class PlantController : ControllerBase
    {
        private readonly IServiceWrapper _service;

        public PlantController(IServiceWrapper service)
        {
            _service = service;
        }

        // GET: api/plants?sortby=column
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plant>>> Get([FromQuery(Name = "sortby")] string sortBy)
        {
            return await _service.Plant.GetAllPlants(sortBy);
        }

        // GET api/plants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Plant>> Get(int id)
        {
            return await _service.Plant.GetPlantById(id);
        }

        // POST api/plants
        [HttpPost]
        public async Task<ActionResult<Plant>> Post([FromBody] Plant value)
        {
            await _service.Plant.AddPlant(value);
            return CreatedAtAction("Get", new { id = value.Id }, value);
        }

        // PUT api/plants/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Plant value)
        {
            await _service.Plant.UpdatePlant(id, value);
            return NoContent();
        }

        // DELETE api/plants/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _service.Plant.RemovePlant(id);
            return NoContent();
        }
    }
}

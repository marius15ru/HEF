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
        private readonly IPlantService _service;

        public PlantController(IPlantService service)
        {
            _service = service;
        }

        // GET: api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plant>>> Get()
        {
            return await _service.GetAllPlants();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Plant>> Get(int id)
        {
            return await _service.GetPlantById(id);
        }

        // POST api/values
        [HttpPost]
        public async Task Post([FromBody] Plant value)
        {
            await _service.AddPlant(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] Plant value)
        {
            await _service.UpdatePlant(id, value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.RemovePlant(id);
        }
    }
}

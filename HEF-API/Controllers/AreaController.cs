using System.Collections.Generic;
using System.Threading.Tasks;
using HEF_API.Models;
using HEF_API.RequestModels;
using HEF_API.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HEF_API.Controllers
{
    [Route("api/areas")]
    public class AreaController : ControllerBase
    {
        private readonly IServiceWrapper _service;

        public AreaController(IServiceWrapper service)
        {
            _service = service;
        }

        // GET: api/areas?sortby=column
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Area>>> Get([FromQuery(Name = "sortby")] string sortBy)
        {
            return await _service.Area.GetAllAreas(sortBy);
        }

        // GET api/areas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Area>> Get(int id)
        {
            var value = await _service.Area.GetAreaById(id);
            if (value == null)
                return NotFound();

            return Ok(value);
        }

        // POST api/areas
        [HttpPost]
        public async Task<ActionResult<Area>> Post([FromBody] Area value)
        {
            if (value == null)
                return BadRequest("Object is null");
            if (!ModelState.IsValid)
                return BadRequest("Invalid model object");
           
            await _service.Area.AddArea(value);

            return CreatedAtAction("Get", new { id = value.Id }, value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Area value)
        {
            if(value == null)
                return BadRequest("Object er null");
            if (id != value.Id)
                return BadRequest("Id does not match object.");

            var area = _service.Area.GetAreaById(id);
            if (area == null)
                return NotFound();

            await _service.Area.UpdateArea(id, value); 

            return NoContent();
        }

        // DELETE api/areas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _service.Area.RemoveArea(id);
            return NoContent();
        }
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using HEF_API.Models;
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
            return await _service.Area.GetAreaById(id);
        }

        // POST api/areas
        [HttpPost]
        public async Task Post([FromBody] Area value)
        {
            await _service.Area.AddArea(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] Area value)
        {
            await _service.Area.UpdateArea(id, value);
        }

        // DELETE api/areas/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.Area.RemoveArea(id);
        }
    }
}

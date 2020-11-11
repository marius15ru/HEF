using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HEF_API.Models;
using HEF_API.Services;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HEF_API.Controllers
{
    [Route("api/areas")]
    public class AreaController : ControllerBase
    {
        private readonly IAreaService _service;

        public AreaController(IAreaService service)
        {
            _service = service;
        }

        // GET: api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Area>>> Get()
        {
            return await _service.GetAllAreas();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Area>> Get(int id)
        {
            return await _service.GetAreaById(1);
        }

        // POST api/values
        [HttpPost]
        public async Task Post([FromBody] Area value)
        {
            await _service.AddArea(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] Area value)
        {
            await _service.EditArea(id, value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.RemoveArea(id);
        }
    }
}

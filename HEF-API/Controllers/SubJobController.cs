using System.Collections.Generic;
using System.Threading.Tasks;
using HEF_API.Models;
using HEF_API.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HEF_API.Controllers
{
    [Route("api/subjobs")]
    public class SubJobController : ControllerBase
    {
        private readonly ISubJobService _service;

        public SubJobController(ISubJobService service)
        {
            _service = service;
        }

        // GET: api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubJob>>> Get()
        {
            return await _service.GetAllSubJobs();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubJob>> Get(int id)
        {
            return await _service.GetSubJobById(id);
        }

        // POST api/values
        [HttpPost]
        public async Task Post([FromBody] SubJob value)
        {
            await _service.AddSubJob(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] SubJob value)
        {
            await _service.UpdateSubJob(id, value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.RemoveSubJob(id);
        }
    }
}

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
        private readonly IServiceWrapper _service;

        public SubJobController(IServiceWrapper service)
        {
            _service = service;
        }

        // GET: api/subjobs?sortby=column
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubJob>>> Get([FromQuery(Name = "sortby")] string sortBy)
        {
            return await _service.SubJob.GetAllSubJobs(sortBy);
        }

        // GET api/subjobs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubJob>> Get(int id)
        {
            return await _service.SubJob.GetSubJobById(id);
        }

        // POST api/subjobs
        [HttpPost]
        public async Task Post([FromBody] SubJob value)
        {
            await _service.SubJob.AddSubJob(value);
        }

        // PUT api/subjobs/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] SubJob value)
        {
            await _service.SubJob.UpdateSubJob(id, value);
        }

        // DELETE api/subjobs/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.SubJob.RemoveSubJob(id);
        }
    }
}

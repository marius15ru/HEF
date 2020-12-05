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
    [Route("api/jobs")]
    public class JobController : ControllerBase
    {
        private readonly IServiceWrapper _service;

        public JobController(IServiceWrapper service)
        {
            _service = service;
        }

        // GET: api/jobs?sortby=column
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Job>>> Get([FromQuery(Name = "sortby")] string sortBy)
        {
            return await _service.Job.GetAllJobs(sortBy);
        }

        // GET api/jobs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> Get(int id)
        {
            return await _service.Job.GetJobById(id);
        }

        // POST api/jobs
        [HttpPost]
        public async Task Post([FromBody] Job value)
        {
            await _service.Job.AddJob(value);
        }

        // PUT api/jobs/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] Job value)
        {
            await _service.Job.UpdateJob(id, value);
        }

        // DELETE api/jobs/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.Job.RemoveJob(id);
        }

        // GET api/users/{jobId}/users
        [HttpGet("{jobId}/users")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers(int jobId)
        {
            return await _service.Job.GetJobUsersByJobId(jobId);
        }

        // POST api/users/{userId}/jobs
        [HttpPost("{userId}/jobs")]
        public async Task PostUser([FromBody] Job_Assignments value)
        {
            await _service.Job.AddJobUser(value);
        }

        // DELETE api/users/{userId}/jobs
        [HttpPost("{userId}/jobs")]
        public async Task DeleteJob(int userId, [FromBody] Job_Assignments value)
        {
            await _service.Job.RemoveJobUser(userId, value.JobId);
        }
    }
}

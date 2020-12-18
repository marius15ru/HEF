using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
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
        private readonly IRepositoryWrapper _repositoryWrapper;

        public JobController(IRepositoryWrapper repositoryWrapper)
        {
            _repositoryWrapper = repositoryWrapper;
        }

        // GET: api/jobs?sortby=column
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Job>>> Get([FromQuery(Name = "sortby")] string sortBy)
        {
            // filter: y => y.Id == 2;
            sortBy ??= "id";
            var result = await _repositoryWrapper.Job.Get(null, x => x.OrderBy(sortBy));
            return Ok(result);
        }

        // GET api/jobs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> Get(int id)
        {
            var result = await _repositoryWrapper.Job.GetByID(id);
            if (result == null)
                return NotFound("Object with given Id not found.");

            return Ok(result);
        }

        // POST api/jobs
        [HttpPost]
        public async Task<ActionResult<Job>> Post([FromBody] Job value)
        {
            if (value == null)
                return BadRequest("Object is null");
            if (!ModelState.IsValid)
                return BadRequest("Invalid model object");

            try
            {
                _repositoryWrapper.Job.Insert(value);
                await _repositoryWrapper.Save();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error number: " + ex.HResult);
                Console.WriteLine("Error info: " + ex.Message);
            }

            return CreatedAtAction("Get", new { id = value.Id }, value);
        }

        // PUT api/jobs/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Job value)
        {
            if (value == null)
                return BadRequest("Object er null");
            if (!id.Equals(value.Id))
                return BadRequest("Id does not match object.");

            try
            {
                _repositoryWrapper.Job.Update(value);
                await _repositoryWrapper.Save();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error number: " + ex.HResult);
                Console.WriteLine("Error info: " + ex.Message);
            }

            return NoContent();
        }

        // DELETE api/jobs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                _repositoryWrapper.Job.Delete(id);
                await _repositoryWrapper.Save();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error number: " + ex.HResult);
                Console.WriteLine("Error info: " + ex.Message);
            }

            return NoContent();
        }

        // - - Job Assignments - -

        // GET api/jobs/5/users
        [HttpGet("{jobId}/users")]
        public async Task<ActionResult<User>> GetUsersByJobId(int jobId)
        {
            var UserJobs = await _repositoryWrapper.UserJobs.Get(x => x.JobId == jobId);
            var UserIDs = UserJobs.ToList().Select(x => x.UserId);
            var Users = await _repositoryWrapper.User.Get(x => UserIDs.Contains(x.Id));
            return Ok(Users);
        }

        // POST api/jobs/5/users/1
        [HttpPost("{jobId}/users/{userId}")]
        public async Task<ActionResult<Job_Assignments>> AddJobUser(int jobId, int userId)
        {

            Job_Assignments jobUser = new Job_Assignments
                {
                    UserId = userId,
                    JobId = jobId
                };
            try
            {
                _repositoryWrapper.UserJobs.Insert(jobUser);
                await _repositoryWrapper.Save();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error number: " + ex.HResult);
                Console.WriteLine("Error info: " + ex.Message);
            }

            return CreatedAtAction("Get", jobUser);
        }

        // DELETE api/jobs/5/users/1
        [HttpDelete("{jobId}/users/{userId}")]
        public async Task<ActionResult> RemoveJobUser(int jobId, int userId)
        {
            var UserJob = new Job_Assignments
            {
                JobId = jobId,
                UserId = userId
            };
            _repositoryWrapper.UserJobs.Delete(UserJob);
            await _repositoryWrapper.Save();
            return NoContent();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using HEF_API.Models;
using HEF_API.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HEF_API.Controllers
{
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public UserController(IRepositoryWrapper repositoryWrapper)
        {
            _repositoryWrapper = repositoryWrapper;
        }

        // GET: api/users?sortby=column
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get([FromQuery(Name = "sortby")] string sortBy)
        {
            // filter: y => y.Id == 2;
            sortBy ??= "id";
            var result = await _repositoryWrapper.User.Get(null, x => x.OrderBy(sortBy));
            return Ok(result);
        }

        // GET api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(int id)
        {
            var result = await _repositoryWrapper.User.GetByID(id);
            if (result == null)
                return NotFound("Object with given Id not found.");

            return Ok(result);
        }

        // POST api/users
        [HttpPost]
        public async Task<ActionResult<User>> Post([FromBody] User value)
        {
            if (value == null)
                return BadRequest("Object is null");
            if (!ModelState.IsValid)
                return BadRequest("Invalid model object");

            try
            {
                _repositoryWrapper.User.Insert(value);
                await _repositoryWrapper.Save();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error number: " + ex.HResult);
                Console.WriteLine("Error info: " + ex.Message);
            }

            return CreatedAtAction("Get", new { id = value.Id }, value);
        }

        // PUT api/users/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] User value)
        {
            if (value == null)
                return BadRequest("Object er null");
            if (!id.Equals(value.Id))
                return BadRequest("Id does not match object.");

            try
            {
                _repositoryWrapper.User.Update(value);
                await _repositoryWrapper.Save();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error number: " + ex.HResult);
                Console.WriteLine("Error info: " + ex.Message);
            }

            return NoContent();
        }

        // DELETE api/users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                _repositoryWrapper.User.Delete(id);
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

        // GET api/users/5/jobs
        [HttpGet("{userId}/jobs")]
        public async Task<ActionResult<Job>> GetUsersByJobId(int userId)
        {
            var UserJobs = await _repositoryWrapper.UserJobs.Get(x => x.UserId == userId);
            var JobIDs = UserJobs.ToList().Select(x => x.JobId);
            var Jobs = await _repositoryWrapper.Job.Get(x => JobIDs.Contains(x.Id));
            return Ok(Jobs);
        }
    }
}

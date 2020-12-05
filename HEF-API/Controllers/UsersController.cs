using System.Collections.Generic;
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
        private readonly IServiceWrapper _serviceWrapper;

        public UserController(IServiceWrapper service)
        {
            _serviceWrapper = service;
        }

        // GET: api/users?sortby=column
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get([FromQuery(Name = "sortby")] string sortBy)
        {
            return await _serviceWrapper.User.GetAllUsers(sortBy);
        }

        // GET api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(int id)
        {
            return await _serviceWrapper.User.GetUserById(id);
        }

        // POST api/users
        [HttpPost]
        public async Task Post([FromBody] User value)
        {
            await _serviceWrapper.User.AddUser(value);
        }

        // PUT api/users/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] User value)
        {
            await _serviceWrapper.User.UpdateUser(id, value);
        }

        // DELETE api/users/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _serviceWrapper.User.RemoveUser(id);
        }
        
        // GET api/users/{userId}/jobs
        [HttpGet("{userId}/jobs")]
        public async Task<ActionResult<IEnumerable<Job>>> GetJobs(int userId)
        {
            return await _serviceWrapper.User.GetUserJobsByUserId(userId);
        }
    }
}

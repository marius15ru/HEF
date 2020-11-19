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

        // GET: api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return await _serviceWrapper.User.GetAllUsers();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(int id)
        {
            return await _serviceWrapper.User.GetUserById(id);
        }

        // POST api/values
        [HttpPost]
        public async Task Post([FromBody] User value)
        {
            await _serviceWrapper.User.AddUser(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] User value)
        {
            await _serviceWrapper.User.UpdateUser(id, value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _serviceWrapper.User.RemoveUser(id);
        }
    }
}

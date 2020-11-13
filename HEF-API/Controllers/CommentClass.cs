using System.Collections.Generic;
using System.Threading.Tasks;
using HEF_API.Models;
using HEF_API.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HEF_API.Controllers
{
    [Route("api/comments")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _service;

        public CommentController(ICommentService service)
        {
            _service = service;
        }

        // GET: api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> Get()
        {
            return await _service.GetAllComments();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> Get(int id)
        {
            return await _service.GetCommentById(id);
        }

        // POST api/values
        [HttpPost]
        public async Task Post([FromBody] Comment value)
        {
            await _service.AddComment(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] Comment value)
        {
            await _service.UpdateComment(id, value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.RemoveComment(id);
        }
    }
}

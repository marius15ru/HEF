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
        private readonly IServiceWrapper _service;

        public CommentController(IServiceWrapper service)
        {
            _service = service;
        }

        // GET: api/comments?sortby=column
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> Get([FromQuery(Name = "sortby")] string sortBy)
        {
            return await _service.Comment.GetAllComments(sortBy);
        }

        // GET api/comments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> Get(int id)
        {
            return await _service.Comment.GetCommentById(id);
        }

        // POST api/comments
        [HttpPost]
        public async Task Post([FromBody] Comment value)
        {
            await _service.Comment.AddComment(value);
        }

        // PUT api/comments/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] Comment value)
        {
            await _service.Comment.UpdateComment(id, value);
        }

        // DELETE api/comments/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.Comment.RemoveComment(id);
        }
    }
}

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
    public class JobsController : ControllerBase
    {
        private RepoContext _context;

        public JobsController(RepoContext context)
        {
            _context = context;
        }
        // GET: api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Job>>> Get()
        {
            using (_context.Database.BeginTransaction())
            {
                return await _context.Job.ToListAsync();
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

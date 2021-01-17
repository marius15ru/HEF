using System;
using System.Collections.Generic;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using HEF_API.Models;
using HEF_API.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HEF_API.Controllers
{
    [Route("api/subjobs/history")]
    public class SubJobHistoryController : ControllerBase
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public SubJobHistoryController(IRepositoryWrapper repositoryWrapper)
        {
            _repositoryWrapper = repositoryWrapper;
        }

        // GET: api/subjobs/history/jobId?sortby=column
        [HttpGet("{jobId}")]
        public async Task<ActionResult<IEnumerable<SubJobHistory>>> Get(int jobId, [FromQuery(Name = "sortby")] string sortBy)
        {
            // filter: y => y.Id == 2;
            try
            {
                sortBy ??= "id";
                var result = await _repositoryWrapper.SubJobHistory.Get(f => f.JobId == jobId, x => x.OrderBy(sortBy));
                return Ok(result);
            }
            catch(Exception ex)
            {
                Console.WriteLine("Error code" + ex.HResult);
                Console.WriteLine("Error message" + ex.Message);
            }
            return StatusCode(500);
        }

        // POST api/subjobs
        [HttpPost]
        public async Task<ActionResult<SubJobHistory>> Post([FromBody] SubJobHistory value)
        {
            if (value == null)
                return BadRequest("Object is null");
            if (!ModelState.IsValid)
                return BadRequest("Invalid model object");

            try
            {
                _repositoryWrapper.SubJobHistory.Insert(value);
                await _repositoryWrapper.Save();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error number: " + ex.HResult);
                Console.WriteLine("Error info: " + ex.Message);
            }

            return CreatedAtAction("Get", new { id = value.Id }, value);
        }
    }
}

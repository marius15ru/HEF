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
    [Route("api/subjobs")]
    public class SubJobController : ControllerBase
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public SubJobController(IRepositoryWrapper repositoryWrapper)
        {
            _repositoryWrapper = repositoryWrapper;
        }

        // GET: api/subjobs?sortby=column
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubJob>>> Get([FromQuery(Name = "sortby")] string sortBy)
        {
            // filter: y => y.Id == 2;
            try
            {
                sortBy ??= "id";
                var result = await _repositoryWrapper.SubJob.Get(null, x => x.OrderBy(sortBy));
                return Ok(result);
            }
            catch(Exception ex)
            {
                Console.WriteLine("Error code" + ex.HResult);
                Console.WriteLine("Error message" + ex.Message);
            }
            return StatusCode(500);
        }

        // GET api/subjobs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubJob>> Get(int id)
        {
            var result = await _repositoryWrapper.SubJob.GetByID(id);
            if (result == null)
                return NotFound("Object with given Id not found.");

            return Ok(result);
        }

        // POST api/subjobs
        [HttpPost]
        public async Task<ActionResult<SubJob>> Post([FromBody] SubJob value)
        {
            if (value == null)
                return BadRequest("Object is null");
            if (!ModelState.IsValid)
                return BadRequest("Invalid model object");

            try
            {
                _repositoryWrapper.SubJob.Insert(value);
                await _repositoryWrapper.Save();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error number: " + ex.HResult);
                Console.WriteLine("Error info: " + ex.Message);
            }

            return CreatedAtAction("Get", new { id = value.Id }, value);
        }

        // PUT api/subjobs/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] SubJob value)
        {
            if (value == null)
                return BadRequest("Object er null");
            if (!id.Equals(value.Id))
                return BadRequest("Id does not match object.");

            try
            {
                _repositoryWrapper.SubJob.Update(value);
                await _repositoryWrapper.Save();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error number: " + ex.HResult);
                Console.WriteLine("Error info: " + ex.Message);
            }

            return NoContent();
        }

        // DELETE api/subjobs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                _repositoryWrapper.SubJob.Delete(id);
                await _repositoryWrapper.Save();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error number: " + ex.HResult);
                Console.WriteLine("Error info: " + ex.Message);
            }

            return NoContent();
        }
    }
}

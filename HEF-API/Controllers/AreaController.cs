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
    [Route("api/areas")]
    public class AreaController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public AreaController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        // GET: api/areas?sortby=column
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Area>>> Get([FromQuery(Name = "sortby")] string sortBy)
        {
            // filter: y => y.Id == 2;
            sortBy ??= "id";
            var result = await _repository.Area.Get(null, x => x.OrderBy(sortBy));
            return Ok(result);
        }

        // GET api/areas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Area>> Get(int id)
        {
            var result = await _repository.Area.GetByID(id);
            if (result == null)
                return NotFound("Object with given Id not found.");

            return Ok(result);
        }

        // POST api/areas
        [HttpPost]
        public async Task<ActionResult<Area>> Post([FromBody] Area value)
        {
            if (value == null)
                return BadRequest("Object is null");
            if (!ModelState.IsValid)
                return BadRequest("Invalid model object");

            try
            {
                _repository.Area.Insert(value);
                await _repository.Save();
            }
            catch(Exception ex)
            {
                Console.WriteLine("Error number: " + ex.HResult);
                Console.WriteLine("Error info: " + ex.Message);
            }

            return CreatedAtAction("Get", new { id = value.Id }, value);
        }

        // PUT api/areas/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Area value)
        {
            if(value == null)
                return BadRequest("Object er null");
            if (!id.Equals(value.Id))
                return BadRequest("Id does not match object.");
            /*
            var area = await _repository.Area.GetByID(id);
            if (area == null)
                return NotFound();
            */

            try
            {
                _repository.Area.Update(value);
                await _repository.Save();
            }
            catch(Exception ex)
            {
                Console.WriteLine("Error number: " + ex.HResult);
                Console.WriteLine("Error info: " + ex.Message);
            }

            return NoContent();
        }

        // DELETE api/areas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            /*
            var if_exists = _repository.Area.GetByID(id);
            if (if_exists == null)
                return NotFound();
            */
            try
            {
                _repository.Area.Delete(id);
                await _repository.Save();
            }
            catch(Exception ex)
            {
                Console.WriteLine("Error number: " + ex.HResult);
                Console.WriteLine("Error info: " + ex.Message);
            }

            return NoContent();
        }
    }
}

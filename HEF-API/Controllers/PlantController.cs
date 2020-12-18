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
    [Route("api/plants")]
    public class PlantController : ControllerBase
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public PlantController(IRepositoryWrapper repositoryWrapper)
        {
            _repositoryWrapper = repositoryWrapper;
        }

        // GET: api/plants?sortby=column
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plant>>> Get([FromQuery(Name = "sortby")] string sortBy)
        {
            // filter: y => y.Id == 2;
            sortBy ??= "id";
            var result = await _repositoryWrapper.Plant.Get(null, x => x.OrderBy(sortBy));
            return Ok(result);
        }

        // GET api/plants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Plant>> Get(int id)
        {
            var result = await _repositoryWrapper.Plant.GetByID(id);
            if (result == null)
                return NotFound("Object with given Id not found.");

            return Ok(result);
        }

        // POST api/plants
        [HttpPost]
        public async Task<ActionResult<Plant>> Post([FromBody] Plant value)
        {
            if (value == null)
                return BadRequest("Object is null");
            if (!ModelState.IsValid)
                return BadRequest("Invalid model object");

            try
            {
                _repositoryWrapper.Plant.Insert(value);
                await _repositoryWrapper.Save();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error number: " + ex.HResult);
                Console.WriteLine("Error info: " + ex.Message);
            }

            return CreatedAtAction("Get", new { id = value.Id }, value);
        }

        // PUT api/plants/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Plant value)
        {
            if (value == null)
                return BadRequest("Object er null");
            if (!id.Equals(value.Id))
                return BadRequest("Id does not match object.");

            try
            {
                _repositoryWrapper.Plant.Update(value);
                await _repositoryWrapper.Save();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error number: " + ex.HResult);
                Console.WriteLine("Error info: " + ex.Message);
            }

            return NoContent();
        }

        // DELETE api/plants/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                _repositoryWrapper.Plant.Delete(id);
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

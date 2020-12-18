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
    [Route("api/equipments")]
    public class EquipmentController : ControllerBase
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public EquipmentController(IRepositoryWrapper repositoryWrapper)
        {
            _repositoryWrapper = repositoryWrapper;
        }

        // GET: api/equipments?sortby=column
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Equipment>>> Get([FromQuery(Name = "sortby")] string sortBy)
        {
            // filter: y => y.Id == 2;
            sortBy ??= "id";
            var result = await _repositoryWrapper.Equipment.Get(null, x => x.OrderBy(sortBy));
            return Ok(result);
        }

        // GET api/equipments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Equipment>> Get(int id)
        {
            var result = await _repositoryWrapper.Equipment.GetByID(id);
            if (result == null)
                return NotFound("Object with given Id not found.");

            return Ok(result);
        }

        // POST api/equipments
        [HttpPost]
        public async Task<ActionResult<Equipment>> Post([FromBody] Equipment value)
        {
            if (value == null)
                return BadRequest("Object is null");
            if (!ModelState.IsValid)
                return BadRequest("Invalid model object");

            try
            {
                _repositoryWrapper.Equipment.Insert(value);
                await _repositoryWrapper.Save();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error number: " + ex.HResult);
                Console.WriteLine("Error info: " + ex.Message);
            }

            return CreatedAtAction("Get", new { id = value.Id }, value);
        }

        // PUT api/equipments/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Equipment value)
        {
            if (value == null)
                return BadRequest("Object er null");
            if (!id.Equals(value.Id))
                return BadRequest("Id does not match object.");

            try
            {
                _repositoryWrapper.Equipment.Update(value);
                await _repositoryWrapper.Save();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error number: " + ex.HResult);
                Console.WriteLine("Error info: " + ex.Message);
            }

            return NoContent();
        }

        // DELETE api/equipments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                _repositoryWrapper.Equipment.Delete(id);
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

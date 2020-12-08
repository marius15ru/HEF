using System.Collections.Generic;
using System.Threading.Tasks;
using HEF_API.Models;
using HEF_API.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HEF_API.Controllers
{
    [Route("api/stations")]
    public class StationController : ControllerBase
    {
        private readonly IServiceWrapper _service;

        public StationController(IServiceWrapper service)
        {
            _service = service;
        }

        // GET: api/stations?sortby=column
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Station>>> Get([FromQuery(Name = "sortby")] string sortBy)
        {
            return await _service.Station.GetAllStations(sortBy);
        }

        // GET api/stations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Station>> Get(int id)
        {
            return await _service.Station.GetStationById(id);
        }

        // POST api/stations
        [HttpPost]
        public async Task<ActionResult<Station>> Post([FromBody] Station value)
        {
            await _service.Station.AddStation(value);
            return CreatedAtAction("Get", new { id = value.Id }, value);
        }

        // PUT api/stations/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Station value)
        {
            await _service.Station.UpdateStation(id, value);
            return NoContent();
        }

        // DELETE api/stations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _service.Station.RemoveStation(id);
            return NoContent();
        }
    }
}

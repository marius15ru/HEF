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

        // GET: api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Station>>> Get()
        {
            return await _service.Station.GetAllStations();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Station>> Get(int id)
        {
            return await _service.Station.GetStationById(id);
        }

        // POST api/values
        [HttpPost]
        public async Task Post([FromBody] Station value)
        {
            await _service.Station.AddStation(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] Station value)
        {
            await _service.Station.UpdateStation(id, value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.Station.RemoveStation(id);
        }
    }
}

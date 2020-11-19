﻿using System;
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
    [Route("api/Jobs")]
    public class JobController : ControllerBase
    {
        private readonly IServiceWrapper _service;

        public JobController(IServiceWrapper service)
        {
            _service = service;
        }

        // GET: api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Job>>> Get()
        {
            return await _service.Job.GetAllJobs();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> Get(int id)
        {
            return await _service.Job.GetJobById(id);
        }

        // POST api/values
        [HttpPost]
        public async Task Post([FromBody] Job value)
        {
            await _service.Job.AddJob(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] Job value)
        {
            await _service.Job.UpdateJob(id, value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.Job.RemoveJob(id);
        }
    }
}

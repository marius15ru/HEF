using System;
using HEF_API.Models;
using HEF_API.Controllers;
using Xunit;
using System.Collections.Generic;
using HEF_API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Xunit.Abstractions;
using System.Linq;
using Newtonsoft.Json;
using System.Net.Http;

namespace HEF_Test
{
    public class JobTests: TestWithSqlite
    {
        private readonly ITestOutputHelper output;
        private readonly JobService _service;

        public JobTests(ITestOutputHelper output)
        {
            this.output = output;
            Populate();
            _service = new JobService(dbContext);
        }

        private void Populate()
        {
            dbContext.Add(new Job
            {
                Name = "UN2",
                Description = "Lýsing",
                Status = (Enums.JobStatus)1,
                CompleteBy = new DateTime(2020, 10, 01),
                Recurring = false,
                Duration = "01:30",
                EmergencyJob = false,
                HasComments = false,
                LastCheck = new DateTime(2020, 08, 08)
            });
            dbContext.Add(new Job
            {
                Name = "MIN30",
                Description = "Lýsing",
                Status = (Enums.JobStatus)1,
                CompleteBy = new DateTime(2020, 10, 01),
                Recurring = false,
                Duration = "01:30",
                EmergencyJob = false,
            });
            dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAll()
        {
            var res = await _service.GetAllJobs();

            var dbCount = res.Count();
            var lastId = res.Last().Id;

            Assert.Equal(2, dbCount);
            Assert.Equal(2, lastId);
        }

        [Fact]
        public async Task GetById()
        {
            var id = 1;
            var res = await _service.GetJobById(id);

            var redId = res.Id;

            Assert.Equal(1, redId);
        }

        [Fact]
        public async Task Create()
        {
            var enitity = new Job
            {
                Name = "njob",
                Description = "Lýsing",
                Status = (Enums.JobStatus)1,
                CompleteBy = new DateTime(2020, 10, 01),
                Recurring = false,
                Duration = "01:30",
                EmergencyJob = false,
                HasComments = false,
                LastCheck = new DateTime(2020, 10, 08)
            };

            await _service.AddJob(enitity);

            var dbCount = dbContext.Job.Count();
            var lastId = dbContext.Job.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, dbCount);
            Assert.Equal(3, lastId);
        }

        [Fact]
        public async Task Update()
        {
            int id = 2;
            var enitity = new Job
            {
                Name = "Change Job",
                HasComments = true
            };

            await _service.UpdateJob(id, enitity);

            var res = dbContext.Job.Where(x => x.Id == 2).Single().Name;

            Assert.Equal("Change Job", res);
        }

        [Fact]
        public async Task Delete()
        {
            int id = 2;
            var before = dbContext.Job.Count();

            await _service.RemoveJob(id);

            var after = dbContext.Job.Count() + 1;

            Assert.Equal(before, after);
        }
    }
}

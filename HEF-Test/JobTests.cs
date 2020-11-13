using System;
using HEF_API.Models;
using HEF_API.Controllers;
using Xunit;
using Moq;
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
    public class AreaTests: TestWithSqlite
    {
        private readonly ITestOutputHelper output;
        private readonly AreaService _service;

        public AreaTests(ITestOutputHelper output)
        {
            this.output = output;
            Populate();
            _service = new AreaService(dbContext);
        }

        private void Populate()
        {
            dbContext.Add(new Area { Name = "Fellar" });
            dbContext.Add(new Area { Name = "Egilsst" });
            dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAll()
        {
            var res = await _service.GetAllAreas();

            var dbCount = res.Count();
            var lastId = res.Last().Id;

            Assert.Equal(2, dbCount);
            Assert.Equal(2, lastId);
        }

        [Fact]
        public async Task GetById()
        {
            var id = 1;
            var res = await _service.GetAreaById(id);

            var redId = res.Id;

            Assert.Equal(1, redId);
        }

        [Fact]
        public async Task Create()
        {
            var enitity = new Area { Name = "Vogur" };

            await _service.AddArea(enitity);

            var dbCount = dbContext.Area.Count();
            var lastId = dbContext.Area.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, dbCount);
            Assert.Equal(3, lastId);
        }

        [Fact]
        public async Task Update()
        {
            int id = 2;
            var enitity = new Area { Name = "Vogur" };

            await _service.EditArea(id, enitity);

            var res = dbContext.Area.Where(x => x.Id == 2).Single().Name;

            Assert.Equal("Vogur", res);
        }

        [Fact]
        public async Task Delete()
        {
            int id = 2;
            var before = dbContext.Area.Count();

            await _service.RemoveArea(id);

            var after = dbContext.Area.Count() + 1;

            Assert.Equal(before, after);
        }
    }
}

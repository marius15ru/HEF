using System;
using HEF_API.Models;
using Xunit;
using HEF_API.Services;
using System.Threading.Tasks;
using Xunit.Abstractions;
using System.Linq;
using Bogus;
using System.Collections.Generic;

namespace HEF_Test.Services
{
    public class SubJobTests : TestDbContext
    {
        private readonly ITestOutputHelper output;
        private readonly IServiceWrapper _service;

        private readonly IModelGenerator _modelGen;
        private readonly Faker<SubJob> _SubJobGenerator;

        public SubJobTests(ITestOutputHelper output)
        {
            this.output = output;
            _service = new ServiceWrapper(dbContext);

            _modelGen = new ModelGenerator();
            _SubJobGenerator = _modelGen.GetSubJobGenerator;

            PopulateDB();
        }

        private void PopulateDB()
        {
            dbContext.SubJob.AddRange(_SubJobGenerator.Generate(2));
            dbContext.SaveChanges();
        }

        [Fact]
        public async Task TestGetAllSubJob()
        {
            var result = await _service.SubJob.GetAllSubJobs();

            Assert.IsType<List<SubJob>>(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task TestGetByIdSubJob()
        {
            var id = 1;
            var result = await _service.SubJob.GetSubJobById(id);

            Assert.IsType<SubJob>(result);
            Assert.Equal(id, result.Id);
        }

        [Fact]
        public async Task TestCreateSubJob()
        {
            var enitity = _SubJobGenerator.Generate();

            await _service.SubJob.AddSubJob(enitity);

            var dbCount = dbContext.SubJob.Count();
            var lastId = dbContext.SubJob.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, dbCount);
            Assert.Equal(enitity.Id, lastId);
        }

        [Fact]
        public async Task TestUpdateSubJob()
        {
            int id = 2;
            var name = "New Name";
            var enitity = await _service.SubJob.GetSubJobById(id);
            enitity.Name = name;

            await _service.SubJob.UpdateSubJob(id, enitity);

            var result = dbContext.SubJob.Find(id);

            Assert.Equal(id, result.Id);
            Assert.Equal(name, result.Name);
        }
        
        [Fact]
        public async Task TestDeleteSubJob()
        {
            int id = 2;

            await _service.SubJob.RemoveSubJob(id);

            var subjob = dbContext.SubJob.Find(id);

            Assert.Null(subjob);
        }

        [Fact]
        public async Task TestInvalidDeleteSubJob()
        {
            int id = -1;

            // await Assert.ThrowsAsync<ArgumentNullException>(() => _service.SubJob.RemoveSubJob(id));
        }
    }
}
 
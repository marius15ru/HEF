using HEF_API.Models;
using Xunit;
using HEF_API.Services;
using System.Threading.Tasks;
using System.Linq;
using Bogus;
using System;
using System.Collections.Generic;

namespace HEF_Test.Services
{
    public class JobTests : TestDbContext
    {
        private readonly IServiceWrapper _service;
        private readonly RepoContext _context;
        private readonly Faker<Job> _jobGenerator;

        public JobTests()
        {
            _context = dbContext;
            _service = new ServiceWrapper(_context);

            IModelGenerator _modelGen = new ModelGenerator();
            _jobGenerator = _modelGen.GetJobGenerator;

            PopulateDB();
        }

        private void PopulateDB()
        {
            dbContext.AddRange(_jobGenerator.Generate(2));
            dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAllJobs()
        {
            var result = await _service.Job.GetAllJobs();

            Assert.IsType<List<Job>>(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetJobById()
        {
            var id = 1;
            var result = await _service.Job.GetJobById(id);

            Assert.IsType<Job>(result);
            Assert.Equal(id, result.Id);
        }

        [Fact]
        public async Task GiveValidRequest_CreatesJob()
        {
            var enitity = _jobGenerator.Generate();

            await _service.Job.AddJob(enitity);

            var lastId = _context.Job.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, _context.Job.Count());
            Assert.Equal(enitity.Id, lastId);
        }

        [Fact]
        public async Task GivenValidInput_UpdatesJob()
        {
            int id = 2;
            var enitity = _jobGenerator.Generate();

            await _service.Job.UpdateJob(id, enitity);
            var result = _context.Job.Find(id).Name;

            Assert.Equal(enitity.Name, result);
        }

        [Fact]
        public async Task GivenValidId_DeletesJob()
        {
            int id = 2;
            await _service.Job.RemoveJob(id);
            var after_delete = await _service.Job.GetJobById(id);

            Assert.Null(after_delete);
        }

        [Fact]
        public async Task GivenInvalidId_ThrowsArgumentNullException()
        {
            int id = -1;
            await Assert.ThrowsAsync<ArgumentNullException>(() => _service.Job.RemoveJob(id));
        }
    }
}

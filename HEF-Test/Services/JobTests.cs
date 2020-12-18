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
        private readonly Faker<Job> Faker;
        public JobTests()
            : base()
        {
            Faker = ModelGenerator.JobGenerator();
            dbContext.AddRange(Faker.Generate(2));
            dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAllJobs()
        {
            var result = await _repositoryWrapper.Job.Get();

            Assert.IsType<List<Job>>(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetJobById()
        {
            var id = 1;

            var result = await _repositoryWrapper.Job.GetByID(id);

            Assert.IsType<Job>(result);
            Assert.Equal(id, result.Id);
        }

        [Fact]
        public async Task GiveValidRequest_CreatesJob()
        {
            var enitity = Faker.Generate(1).Single();

            _repositoryWrapper.Job.Insert(enitity);
            await _repositoryWrapper.Save();
            var lastId = dbContext.Job.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, dbContext.Job.Count());
            Assert.Equal(enitity.Id, lastId);
        }

        [Fact]
        public async Task GivenValidInput_UpdatesJob()
        {
            int id = 1;
            string newStr = "<updated string>";
            var enitity = await _repositoryWrapper.Job.GetByID(id);
            enitity.Name = newStr;

            _repositoryWrapper.Job.Update(enitity);
            await _repositoryWrapper.Save();
            var result = dbContext.Job.Find(id).Name;

            Assert.Equal(newStr, result);
        }

        [Fact]
        public async Task GivenValidId_DeletesJob()
        {
            int id = 1;

            _repositoryWrapper.Job.Delete(id);
            await _repositoryWrapper.Save();
            var after_delete = await _repositoryWrapper.Job.GetByID(id);

            Assert.Null(after_delete);
        }

        [Fact]
        public void GivenInvalidId_ThrowsArgumentNullException()
        {
            int id = -1;

            Assert.Throws<ArgumentNullException>(() => _repositoryWrapper.Job.Delete(id));
        }
    }
}

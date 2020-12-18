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
        private readonly Faker<SubJob> Faker;
        public SubJobTests()
            : base()
        {
            Faker = ModelGenerator.SubJobGenerator();
            dbContext.AddRange(Faker.Generate(2));
            dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAllSubJobs()
        {
            var result = await _repositoryWrapper.SubJob.Get();

            Assert.IsType<List<SubJob>>(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetSubJobById()
        {
            var id = 1;

            var result = await _repositoryWrapper.SubJob.GetByID(id);

            Assert.IsType<SubJob>(result);
            Assert.Equal(id, result.Id);
        }

        [Fact]
        public async Task GiveValidRequest_CreatesSubJob()
        {
            var enitity = Faker.Generate(1).Single();

            _repositoryWrapper.SubJob.Insert(enitity);
            await _repositoryWrapper.Save();
            var lastId = dbContext.SubJob.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, dbContext.SubJob.Count());
            Assert.Equal(enitity.Id, lastId);
        }

        [Fact]
        public async Task GivenValidInput_UpdatesSubJob()
        {
            int id = 1;
            string newStr = "<updated string>";
            var enitity = await _repositoryWrapper.SubJob.GetByID(id);
            enitity.Name = newStr;

            _repositoryWrapper.SubJob.Update(enitity);
            await _repositoryWrapper.Save();
            var result = dbContext.SubJob.Find(id).Name;

            Assert.Equal(newStr, result);
        }

        [Fact]
        public async Task GivenValidId_DeletesSubJob()
        {
            int id = 1;

            _repositoryWrapper.SubJob.Delete(id);
            await _repositoryWrapper.Save();
            var after_delete = await _repositoryWrapper.SubJob.GetByID(id);

            Assert.Null(after_delete);
        }

        [Fact]
        public void GivenInvalidId_ThrowsArgumentNullException()
        {
            int id = -1;

            Assert.Throws<ArgumentNullException>(() => _repositoryWrapper.SubJob.Delete(id));
        }
    }
}
 
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
    public class AreaTests: TestDbContext
    {
        private readonly Faker<Area> Faker;
        public AreaTests()
            : base()
        {
            Faker = ModelGenerator.AreaGenerator();
            dbContext.AddRange(Faker.Generate(2));
            dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAllAreas()
        {
            var result = await _repositoryWrapper.Area.Get();

            Assert.IsType<List<Area>>(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetAreaById()
        {
            var id = 1;

            var result = await _repositoryWrapper.Area.GetByID(id);

            Assert.IsType<Area>(result);
            Assert.Equal(id, result.Id);
        }

        [Fact]
        public async Task GiveValidRequest_CreatesArea()
        {
            var enitity = Faker.Generate(1).Single();

            _repositoryWrapper.Area.Insert(enitity);
            await _repositoryWrapper.Save();
            var lastId = dbContext.Area.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, dbContext.Area.Count());
            Assert.Equal(enitity.Id, lastId);
        }

        [Fact]
        public async Task GivenValidInput_UpdatesArea()
        {
            int id = 1;
            string newStr = "<updated string>";
            var enitity = await _repositoryWrapper.Area.GetByID(id);
            enitity.Name = newStr;

            _repositoryWrapper.Area.Update(enitity);
            await _repositoryWrapper.Save();
            var result = dbContext.Area.Find(id).Name;

            Assert.Equal(newStr, result);
        }

        [Fact]
        public async Task GivenValidId_DeletesArea()
        {
            int id = 1;

            _repositoryWrapper.Area.Delete(id);
            await _repositoryWrapper.Save();
            var after_delete = await _repositoryWrapper.Area.GetByID(id);

            Assert.Null(after_delete);
        }

        [Fact]
        public void GivenInvalidId_ThrowsArgumentNullException()
        {
            int id = -1;

            Assert.Throws<ArgumentNullException>(() => _repositoryWrapper.Area.Delete(id));
        }
    }
}

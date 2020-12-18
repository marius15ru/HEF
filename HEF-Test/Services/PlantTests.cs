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
    public class PlantTests : TestDbContext
    {
        private readonly Faker<Plant> Faker;
        public PlantTests()
            : base()
        {
            Faker = ModelGenerator.PlantGenerator();
            dbContext.AddRange(Faker.Generate(2));
            dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAllPlants()
        {
            var result = await _repositoryWrapper.Plant.Get();

            Assert.IsType<List<Plant>>(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetPlantById()
        {
            var id = 1;

            var result = await _repositoryWrapper.Plant.GetByID(id);

            Assert.IsType<Plant>(result);
            Assert.Equal(id, result.Id);
        }

        [Fact]
        public async Task GiveValidRequest_CreatesPlant()
        {
            var enitity = Faker.Generate(1).Single();

            _repositoryWrapper.Plant.Insert(enitity);
            await _repositoryWrapper.Save();
            var lastId = dbContext.Plant.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, dbContext.Plant.Count());
            Assert.Equal(enitity.Id, lastId);
        }

        [Fact]
        public async Task GivenValidInput_UpdatesPlant()
        {
            int id = 1;
            string newStr = "<updated string>";
            var enitity = await _repositoryWrapper.Plant.GetByID(id);
            enitity.Name = newStr;

            _repositoryWrapper.Plant.Update(enitity);
            await _repositoryWrapper.Save();
            var result = dbContext.Plant.Find(id).Name;

            Assert.Equal(newStr, result);
        }

        [Fact]
        public async Task GivenValidId_DeletesPlant()
        {
            int id = 1;

            _repositoryWrapper.Plant.Delete(id);
            await _repositoryWrapper.Save();
            var after_delete = await _repositoryWrapper.Plant.GetByID(id);

            Assert.Null(after_delete);
        }

        [Fact]
        public void GivenInvalidId_ThrowsArgumentNullException()
        {
            int id = -1;

            Assert.Throws<ArgumentNullException>(() => _repositoryWrapper.Plant.Delete(id));
        }
    }
}

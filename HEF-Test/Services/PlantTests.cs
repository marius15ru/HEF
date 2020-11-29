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
        private readonly IServiceWrapper _service;
        private readonly RepoContext _context;
        private readonly Faker<Plant> _plantGenerator;

        public PlantTests()
        {
            _context = dbContext;
            _service = new ServiceWrapper(_context);

            IModelGenerator _modelGen = new ModelGenerator();
            _plantGenerator = _modelGen.GetPlantGenerator;

            PopulateDB();
        }

        private void PopulateDB()
        {
            dbContext.AddRange(_plantGenerator.Generate(2));
            dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAllPlants()
        {
            var result = await _service.Plant.GetAllPlants();

            Assert.IsType<List<Plant>>(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetPlantById()
        {
            var id = 1;
            var result = await _service.Plant.GetPlantById(id);

            Assert.IsType<Plant>(result);
            Assert.Equal(id, result.Id);
        }

        [Fact]
        public async Task GiveValidRequest_CreatesPlant()
        {
            var enitity = _plantGenerator.Generate();

            await _service.Plant.AddPlant(enitity);

            var lastId = _context.Plant.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, _context.Plant.Count());
            Assert.Equal(enitity.Id, lastId);
        }

        [Fact]
        public async Task GivenValidInput_UpdatesPlant()
        {
            int id = 2;
            var enitity = new Plant { Name = "Vogur" };

            await _service.Plant.UpdatePlant(id, enitity);
            var result = _context.Plant.Find(id).Name;

            Assert.Equal("Vogur", result);
        }

        [Fact]
        public async Task GivenValidId_DeletesPlant()
        {
            int id = 2;
            await _service.Plant.RemovePlant(id);
            var after_delete = await _service.Plant.GetPlantById(id);

            Assert.Null(after_delete);
        }

        [Fact]
        public async Task GivenInvalidId_ThrowsArgumentNullException()
        {
            int id = -1;
            await Assert.ThrowsAsync<ArgumentNullException>(() => _service.Plant.RemovePlant(id));
        }
    }
}

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
    public class EquipmentTests : TestDbContext
    {
        private readonly IServiceWrapper _service;
        private readonly RepoContext _context;
        private readonly Faker<Equipment> _equipmentGenerator;

        public EquipmentTests()
        {
            _context = dbContext;
            _service = new ServiceWrapper(_context);

            IModelGenerator _modelGen = new ModelGenerator();
            _equipmentGenerator = _modelGen.GetEquipmentGenerator;

            PopulateDB();
        }

        private void PopulateDB()
        {
            dbContext.AddRange(_equipmentGenerator.Generate(2));
            dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAllEquipments()
        {
            var result = await _service.Equipment.GetAllEquipments();

            Assert.IsType<List<Equipment>>(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetEquipmentById()
        {
            var id = 1;
            var result = await _service.Equipment.GetEquipmentById(id);

            Assert.IsType<Equipment>(result);
            Assert.Equal(id, result.Id);
        }

        [Fact]
        public async Task GiveValidRequest_CreatesEquipment()
        {
            var enitity = _equipmentGenerator.Generate();

            await _service.Equipment.AddEquipment(enitity);

            var lastId = _context.Equipment.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, _context.Equipment.Count());
            Assert.Equal(enitity.Id, lastId);
        }

        [Fact]
        public async Task GivenValidInput_UpdatesEquipment()
        {
            int id = 2;
            var enitity = _equipmentGenerator.Generate();

            await _service.Equipment.UpdateEquipment(id, enitity);
            var result = _context.Equipment.Find(id).Name;

            Assert.Equal(enitity.Name, result);
        }

        [Fact]
        public async Task GivenValidId_DeletesEquipment()
        {
            int id = 2;
            await _service.Equipment.RemoveEquipment(id);
            var after_delete = await _service.Equipment.GetEquipmentById(id);

            Assert.Null(after_delete);
        }

        [Fact]
        public async Task GivenInvalidId_ThrowsArgumentNullException()
        {
            int id = -1;
            await Assert.ThrowsAsync<ArgumentNullException>(() => _service.Equipment.RemoveEquipment(id));
        }
    }
}

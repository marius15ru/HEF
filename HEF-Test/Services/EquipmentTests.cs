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
        private readonly Faker<Equipment> Faker;
        public EquipmentTests()
            : base()
        {
            Faker = ModelGenerator.EquipmentGenerator();
            dbContext.AddRange(Faker.Generate(2));
            dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAllEquipments()
        {
            var result = await _repositoryWrapper.Equipment.Get();

            Assert.IsType<List<Equipment>>(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetEquipmentById()
        {
            var id = 1;

            var result = await _repositoryWrapper.Equipment.GetByID(id);

            Assert.IsType<Equipment>(result);
            Assert.Equal(id, result.Id);
        }

        [Fact]
        public async Task GiveValidRequest_CreatesEquipment()
        {
            var enitity = Faker.Generate(1).Single();

            _repositoryWrapper.Equipment.Insert(enitity);
            await _repositoryWrapper.Save();
            var lastId = dbContext.Equipment.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, dbContext.Equipment.Count());
            Assert.Equal(enitity.Id, lastId);
        }

        [Fact]
        public async Task GivenValidInput_UpdatesEquipment()
        {
            int id = 1;
            string newStr = "<updated string>";
            var enitity = await _repositoryWrapper.Equipment.GetByID(id);
            enitity.Name = newStr;

            _repositoryWrapper.Equipment.Update(enitity);
            await _repositoryWrapper.Save();
            var result = dbContext.Equipment.Find(id).Name;

            Assert.Equal(newStr, result);
        }

        [Fact]
        public async Task GivenValidId_DeletesEquipment()
        {
            int id = 1;

            _repositoryWrapper.Equipment.Delete(id);
            await _repositoryWrapper.Save();
            var after_delete = await _repositoryWrapper.Equipment.GetByID(id);

            Assert.Null(after_delete);
        }

        [Fact]
        public void GivenInvalidId_ThrowsArgumentNullException()
        {
            int id = -1;

            Assert.Throws<ArgumentNullException>(() => _repositoryWrapper.Equipment.Delete(id));
        }
    }
}

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
    public class StationTests: TestDbContext
    {
        private readonly Faker<Station> Faker;
        public StationTests()
            : base()
        {
            Faker = ModelGenerator.StationGenerator();
            dbContext.AddRange(Faker.Generate(2));
            dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAllStations()
        {
            var result = await _repositoryWrapper.Station.Get();

            Assert.IsType<List<Station>>(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetStationById()
        {
            var id = 1;

            var result = await _repositoryWrapper.Station.GetByID(id);

            Assert.IsType<Station>(result);
            Assert.Equal(id, result.Id);
        }

        [Fact]
        public async Task GiveValidRequest_CreatesStation()
        {
            var enitity = Faker.Generate(1).Single();

            _repositoryWrapper.Station.Insert(enitity);
            await _repositoryWrapper.Save();
            var lastId = dbContext.Station.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, dbContext.Station.Count());
            Assert.Equal(enitity.Id, lastId);
        }

        [Fact]
        public async Task GivenValidInput_UpdatesStation()
        {
            int id = 1;
            string newStr = "<updated string>";
            var enitity = await _repositoryWrapper.Station.GetByID(id);
            enitity.Name = newStr;

            _repositoryWrapper.Station.Update(enitity);
            await _repositoryWrapper.Save();
            var result = dbContext.Station.Find(id).Name;

            Assert.Equal(newStr, result);
        }

        [Fact]
        public async Task GivenValidId_DeletesStation()
        {
            int id = 1;

            _repositoryWrapper.Station.Delete(id);
            await _repositoryWrapper.Save();
            var after_delete = await _repositoryWrapper.Station.GetByID(id);

            Assert.Null(after_delete);
        }

        [Fact]
        public void GivenInvalidId_ThrowsArgumentNullException()
        {
            int id = -1;

            Assert.Throws<ArgumentNullException>(() => _repositoryWrapper.Station.Delete(id));
        }
    }
}

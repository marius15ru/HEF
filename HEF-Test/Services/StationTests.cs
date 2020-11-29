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
        private readonly IServiceWrapper _service;
        private readonly RepoContext _context;
        private readonly Faker<Station> _stationGenerator;

        public StationTests()
        {
            _context = dbContext;
            _service = new ServiceWrapper(_context);

            IModelGenerator _modelGen = new ModelGenerator();
            _stationGenerator = _modelGen.GetStationGenerator;

            PopulateDB();
        }

        private void PopulateDB()
        {
            dbContext.AddRange( _stationGenerator.Generate(2) );
            dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAllStations()
        {
            var result = await _service.Station.GetAllStations();

            Assert.IsType<List<Station>>(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetStationById()
        {
            var id = 1;
            var result = await _service.Station.GetStationById(id);

            Assert.IsType<Station>(result);
            Assert.Equal(id, result.Id);
        }

        [Fact]
        public async Task GiveValidRequest_CreatesStation()
        {
            var enitity = _stationGenerator.Generate();

            await _service.Station.AddStation(enitity);

            var lastId = _context.Station.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, _context.Station.Count());
            Assert.Equal(enitity.Id, lastId);
        }

        [Fact]
        public async Task GivenValidInput_UpdatesStation()
        {
            int id = 2;
            var enitity = new Station { Name = "Vogur" };

            await _service.Station.UpdateStation(id, enitity);
            var result = _context.Station.Find(id).Name;

            Assert.Equal("Vogur", result);
        }

        [Fact]
        public async Task GivenValidId_DeletesStation()
        {
            int id = 2;
            await _service.Station.RemoveStation(id);
            var after_delete = await _service.Station.GetStationById(id);

            Assert.Null(after_delete);
        }

        [Fact]
        public async Task GivenInvalidId_ThrowsArgumentNullException()
        {
            int id = -1;
            await Assert.ThrowsAsync<ArgumentNullException>(() => _service.Station.RemoveStation(id));
        }
    }
}

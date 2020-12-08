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
        private readonly IServiceWrapper _service;
        private readonly RepoContext _context;
        private readonly Faker<Area> _areaGenerator;

        public AreaTests()
        {
            _context = dbContext;
            _service = new ServiceWrapper(_context);

            IModelGenerator _modelGen = new ModelGenerator();
            _areaGenerator = _modelGen.GetAreaGenerator;

            PopulateDB();
        }

        private void PopulateDB()
        {
            dbContext.AddRange( _areaGenerator.Generate(2) );
            dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAllAreas()
        {
            var result = await _service.Area.GetAllAreas();

            Assert.IsType<List<Area>>(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetAreaById()
        {
            var id = 1;
            var result = await _service.Area.GetAreaById(id);

            Assert.IsType<Area>(result);
            Assert.Equal(id, result.Id);
        }

        [Fact]
        public async Task GiveValidRequest_CreatesArea()
        {
            var enitity = _areaGenerator.Generate();

            await _service.Area.AddArea(enitity);

            var lastId = _context.Area.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, _context.Area.Count());
            Assert.Equal(enitity.Id, lastId);
        }

        [Fact]
        public async Task GivenValidInput_UpdatesArea()
        {
            int id = 2;
            var enitity = await _service.Area.GetAreaById(id);
            enitity.Name = "Vogur";

            await _service.Area.UpdateArea(id, enitity);
            var result = _context.Area.Find(id).Name;

            Assert.Equal("Vogur", result);
        }

        [Fact]
        public async Task GivenValidId_DeletesArea()
        {
            int id = 2;
            await _service.Area.RemoveArea(id);
            var after_delete = await _service.Area.GetAreaById(id);

            Assert.Null(after_delete);
        }

        [Fact]
        public async Task GivenInvalidId_ThrowsArgumentNullException()
        {
            int id = -1;
            //await _service.Area.RemoveArea(id);
        }
    }
}

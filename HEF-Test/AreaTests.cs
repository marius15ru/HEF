using HEF_API.Models;
using Xunit;
using HEF_API.Services;
using System.Threading.Tasks;
using Xunit.Abstractions;
using System.Linq;
using Bogus;
using System;

namespace HEF_Test
{
    public class AreaTests: TestWithSqlite
    {
        private readonly ITestOutputHelper output;
        private readonly IServiceWrapper _service;

        private readonly IModelGenerator _modelGen;
        private readonly Faker<Area> _areaGenerator;

        public AreaTests(ITestOutputHelper output)
        {
            this.output = output;
            _service = new ServiceWrapper(dbContext);

            _modelGen = new ModelGenerator();
            _areaGenerator = _modelGen.GetAreaGenerator;

            PopulateDB();
        }

        private void PopulateDB()
        {
            _service.Area.AddArea(_areaGenerator.Generate());
            _service.Area.AddArea(_areaGenerator.Generate());
            
            _service.Save();
        }

        [Fact]
        public async Task TestGetAllArea()
        {
            var res = await _service.Area.GetAllAreas();
            this.output.WriteLine("Comms: {0}", _service.Comment.GetAllComments().Result.ToString());

            var dbCount = res.Count();
            var lastId = res.Last().Id;

            Assert.Equal(2, dbCount);
            Assert.Equal(2, lastId);
        }

        [Fact]
        public async Task TestGetByIdArea()
        {
            var id = 1;
            var res = await _service.Area.GetAreaById(id);

            var redId = res.Id;

            Assert.Equal(1, redId);
        }

        [Fact]
        public async Task TestCreateArea()
        {
            var enitity = _areaGenerator.Generate();

            await _service.Area.AddArea(enitity);

            var dbCount = dbContext.Areas.Count();
            var lastId = dbContext.Areas.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, dbCount);
            Assert.Equal(3, lastId);
        }

        [Fact]
        public async Task TestUpdateArea()
        {
            int id = 2;
            var enitity = new Area { Name = "Vogur" };

            await _service.Area.UpdateArea(id, enitity);
            var res = dbContext.Areas.Find(id).Name;

            Assert.Equal("Vogur", res);
        }

        [Fact]
        public async Task TestDeleteArea()
        {
            int id = 2;
            var before = dbContext.Areas.Count();

            await _service.Area.RemoveArea(id);

            var after = dbContext.Areas.Count() + 1;

            Assert.Equal(2, before);
            Assert.Equal(before, after);
        }
    }
}

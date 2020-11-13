using HEF_API.Models;
using Xunit;
using HEF_API.Services;
using System.Threading.Tasks;
using Xunit.Abstractions;
using System.Linq;

namespace HEF_Test
{
    public class AreaTests: TestWithSqlite
    {
        private readonly ITestOutputHelper output;
        private readonly AreaService _service;

        public AreaTests(ITestOutputHelper output)
        {
            this.output = output;
            Populate();
            _service = new AreaService(dbContext);
        }

        private void Populate()
        {
            dbContext.Add(new Area { Name = "Fellar" });
            dbContext.Add(new Area { Name = "Egilsst" });
            dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAll()
        {
            var res = await _service.GetAllAreas();

            var dbCount = res.Count();
            var lastId = res.Last().Id;

            Assert.Equal(2, dbCount);
            Assert.Equal(2, lastId);
        }

        [Fact]
        public async Task GetById()
        {
            var id = 1;
            var res = await _service.GetAreaById(id);

            var redId = res.Id;

            Assert.Equal(1, redId);
        }

        [Fact]
        public async Task Create()
        {
            var enitity = new Area { Name = "Vogur" };

            await _service.AddArea(enitity);

            var dbCount = dbContext.Areas.Count();
            var lastId = dbContext.Areas.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, dbCount);
            Assert.Equal(3, lastId);
        }

        [Fact]
        public async Task Update()
        {
            int id = 2;
            var enitity = new Area { Name = "Vogur" };

            await _service.UpdateArea(id, enitity);
            var res = dbContext.Areas.Find(id).Name;

            Assert.Equal("Vogur", res);
        }

        [Fact]
        public async Task Delete()
        {
            int id = 2;
            var before = dbContext.Areas.Count();

            await _service.RemoveArea(id);

            var after = dbContext.Areas.Count() + 1;

            Assert.Equal(before, after);
        }
    }
}

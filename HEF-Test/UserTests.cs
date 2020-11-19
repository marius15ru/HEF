using HEF_API.Models;
using Xunit;
using HEF_API.Services;
using System.Threading.Tasks;
using Xunit.Abstractions;
using System.Linq;
using Bogus;
using HEF_API.Controllers;

namespace HEF_Test
{
    public class UserTests : TestWithSqlite
    {
        private readonly ITestOutputHelper output;
        private readonly IServiceWrapper _service;
        private readonly UserController _controller;

        private readonly IModelGenerator _modelGen;
        private readonly Faker<User> _userGenerator;

        public UserTests(ITestOutputHelper output)
        {
            this.output = output;
            _service = new ServiceWrapper(dbContext);

            _modelGen = new ModelGenerator();
            _userGenerator = _modelGen.GetUserGenerator;

            _controller = new UserController(_service);

            PopulateDB();
        }

        private void PopulateDB()
        {
            _service.User.AddUser(_userGenerator.Generate());
            _service.User.AddUser(_userGenerator.Generate());
            _service.Save();
        }

        [Fact]
        public async Task TestGetAllUser()
        {
            var res = await _service.User.GetAllUsers();
            this.output.WriteLine("Comms: {0}", _service.Comment.GetAllComments().Result.ToString());

            var dbCount = res.Count();
            var lastId = res.Last().Id;

            Assert.Equal(2, dbCount);
            Assert.Equal(2, lastId);
        }

        [Fact]
        public async Task TestGetByIdUser()
        {
            var id = 1;
            var res = await _service.User.GetUserById(id);

            var redId = res.Id;

            Assert.Equal(1, redId);
        }

        [Fact]
        public async Task TestCreateUser()
        {
            var enitity = _userGenerator.Generate();

            await _service.User.AddUser(enitity);

            var dbCount = dbContext.User.Count();
            var lastId = dbContext.User.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, dbCount);
            Assert.Equal(3, lastId);
        }

        [Fact]
        public async Task TestUpdateUser()
        {
            int id = 2;
            var enitity = new User
            {
                Name = "Jón"
            };

            await _service.User.UpdateUser(id, enitity);
            var res = dbContext.User.Find(id).Name;

            Assert.Equal("Jón", res);
        }

        [Fact]
        public async Task TestDeleteUser()
        {
            int id = 2;
            var before = dbContext.User.Count();

            await _service.User.RemoveUser(id);

            var after = dbContext.User.Count() + 1;

            Assert.Equal(before, after);
        }

        [Fact]
        public async Task TestUserGetAll()
        {
            var cont_get = await _controller.Get();
            var res = cont_get.Value;
            foreach (var i in res)
            {
                output.WriteLine("Id: {0}, Name: {1}", i.Id, i.Name);
            }
            
            Assert.Equal(2, res.Count());
        }
    }
}

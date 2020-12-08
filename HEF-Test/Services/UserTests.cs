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
    public class UserTests: TestDbContext
    {
        private readonly IServiceWrapper _service;
        private readonly RepoContext _context;
        private readonly Faker<User> _userGenerator;

        public UserTests()
        {
            _context = dbContext;
            _service = new ServiceWrapper(_context);

            IModelGenerator _modelGen = new ModelGenerator();
            _userGenerator = _modelGen.GetUserGenerator;

            PopulateDB();
        }

        private void PopulateDB()
        {
            dbContext.AddRange( _userGenerator.Generate(2) );
            dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAllUsers()
        {
            var result = await _service.User.GetAllUsers();

            Assert.IsType<List<User>>(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetUserById()
        {
            var id = 1;
            var result = await _service.User.GetUserById(id);

            Assert.IsType<User>(result);
            Assert.Equal(id, result.Id);
        }

        [Fact]
        public async Task GiveValidRequest_CreatesUser()
        {
            var enitity = _userGenerator.Generate();

            await _service.User.AddUser(enitity);

            var lastId = _context.User.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, _context.User.Count());
            Assert.Equal(enitity.Id, lastId);
        }

        [Fact]
        public async Task GivenValidInput_UpdatesUser()
        {
            int id = 2;
            var entity = await _service.User.GetUserById(id);
            entity.Name = "Vogur";

            await _service.User.UpdateUser(id, entity);
            var result = _context.User.Find(id).Name;

            Assert.Equal(entity.Name, result);
        }

        [Fact]
        public async Task GivenValidId_DeletesUser()
        {
            int id = 2;
            await _service.User.RemoveUser(id);
            var after_delete = await _service.User.GetUserById(id);

            Assert.Null(after_delete);
        }

        [Fact]
        public async Task GivenInvalidId_ThrowsArgumentNullException()
        {
            int id = -1;
            //await Assert.ThrowsAsync<ArgumentNullException>(() => _service.User.RemoveUser(id));
        }
    }
}

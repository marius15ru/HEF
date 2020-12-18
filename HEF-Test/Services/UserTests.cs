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
        private readonly Faker<User> Faker;
        public UserTests()
            : base()
        {
            Faker = ModelGenerator.UserGenerator();
            dbContext.AddRange(Faker.Generate(2));
            dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAllUsers()
        {
            var result = await _repositoryWrapper.User.Get();

            Assert.IsType<List<User>>(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetUserById()
        {
            var id = 1;

            var result = await _repositoryWrapper.User.GetByID(id);

            Assert.IsType<User>(result);
            Assert.Equal(id, result.Id);
        }

        [Fact]
        public async Task GiveValidRequest_CreatesUser()
        {
            var enitity = Faker.Generate(1).Single();

            _repositoryWrapper.User.Insert(enitity);
            await _repositoryWrapper.Save();
            var lastId = dbContext.User.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, dbContext.User.Count());
            Assert.Equal(enitity.Id, lastId);
        }

        [Fact]
        public async Task GivenValidInput_UpdatesUser()
        {
            int id = 1;
            string newStr = "<updated string>";
            var enitity = await _repositoryWrapper.User.GetByID(id);
            enitity.Name = newStr;

            _repositoryWrapper.User.Update(enitity);
            await _repositoryWrapper.Save();
            var result = dbContext.User.Find(id).Name;

            Assert.Equal(newStr, result);
        }

        [Fact]
        public async Task GivenValidId_DeletesUser()
        {
            int id = 1;

            _repositoryWrapper.User.Delete(id);
            await _repositoryWrapper.Save();
            var after_delete = await _repositoryWrapper.User.GetByID(id);

            Assert.Null(after_delete);
        }

        [Fact]
        public void GivenInvalidId_ThrowsArgumentNullException()
        {
            int id = -1;

            Assert.Throws<ArgumentNullException>(() => _repositoryWrapper.User.Delete(id));
        }
    }
}

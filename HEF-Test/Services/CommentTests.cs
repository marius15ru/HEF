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
    public class CommentTests : TestDbContext
    {
        private readonly Faker<Comment> Faker;
        public CommentTests()
            : base()
        {
            Faker = ModelGenerator.CommentGenerator();
            dbContext.AddRange(Faker.Generate(2));
            dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAllComments()
        {
            var result = await _repositoryWrapper.Comment.Get();

            Assert.IsType<List<Comment>>(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetCommentById()
        {
            var id = 1;

            var result = await _repositoryWrapper.Comment.GetByID(id);

            Assert.IsType<Comment>(result);
            Assert.Equal(id, result.Id);
        }

        [Fact]
        public async Task GiveValidRequest_CreatesComment()
        {
            var enitity = Faker.Generate(1).Single();

            _repositoryWrapper.Comment.Insert(enitity);
            await _repositoryWrapper.Save();
            var lastId = dbContext.Comment.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, dbContext.Comment.Count());
            Assert.Equal(enitity.Id, lastId);
        }

        [Fact]
        public async Task GivenValidInput_UpdatesComment()
        {
            int id = 1;
            string newStr = "<updated string>";
            var enitity = await _repositoryWrapper.Comment.GetByID(id);
            enitity.Text = newStr;

            _repositoryWrapper.Comment.Update(enitity);
            await _repositoryWrapper.Save();
            var result = dbContext.Comment.Find(id).Text;

            Assert.Equal(newStr, result);
        }

        [Fact]
        public async Task GivenValidId_DeletesComment()
        {
            int id = 1;

            _repositoryWrapper.Comment.Delete(id);
            await _repositoryWrapper.Save();
            var after_delete = await _repositoryWrapper.Comment.GetByID(id);

            Assert.Null(after_delete);
        }

        [Fact]
        public void GivenInvalidId_ThrowsArgumentNullException()
        {
            int id = -1;

            Assert.Throws<ArgumentNullException>(() => _repositoryWrapper.Comment.Delete(id));
        }
    }
}

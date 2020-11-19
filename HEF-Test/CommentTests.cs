using System;
using HEF_API.Models;
using Xunit;
using HEF_API.Services;
using System.Threading.Tasks;
using Xunit.Abstractions;
using System.Linq;
using Bogus;

namespace HEF_Test
{
    public class CommentTests : TestWithSqlite
    {
        private readonly ITestOutputHelper output;
        private readonly IServiceWrapper _service;

        private readonly Faker<Comment> _commentGenerator;

        private readonly IModelGenerator _modelGen;

        public CommentTests(ITestOutputHelper output)
        {
            this.output = output;
            _modelGen = new ModelGenerator();
            _commentGenerator = _modelGen.GetCommentGenerator;
            _service = new ServiceWrapper(dbContext);
            _service.Comment.AddComment(_commentGenerator.Generate());
            _service.Comment.AddComment(_commentGenerator.Generate());
            _service.Save();
        }
        
        [Fact]
        public async Task TestGetAllComments()
        {
            var res = await _service.Comment.GetAllComments();
            this.output.WriteLine("Area: {0}", _service.Area.GetAllAreas().Result.ToString());
            var dbCount = res.Count();
            var lastId = res.Last().Id;

            Assert.Equal(2, dbCount);
            Assert.Equal(2, lastId);
        }

        [Fact]
        public async Task TestGetByIdComments()
        {
            var id = 1;
            var res = await _service.Comment.GetCommentById(id);

            var resId = res.Id;

            Assert.Equal(1, resId);
        }

        [Fact]
        public async Task TestCreateComments()
        {
            var enitity = _commentGenerator.Generate();

            await _service.Comment.AddComment(enitity);

            var dbCount = dbContext.Comment.Count();
            var lastId = dbContext.Comment.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, dbCount);
            Assert.Equal(3, lastId);
        }

        [Fact]
        public async Task TestUpdateComments()
        {
            int id = 2;
            var enitity = new Comment
            {
                UserId = 1,
                JobId = 1,
                Text = "My text",
                Seen = true,
            };

            await _service.Comment.UpdateComment(id, enitity);

            var res = dbContext.Comment.Find(id).Text;

            Assert.Equal("My text", res);
        }
        
        [Fact]
        public async Task TestDeleteComments()
        {
            int id = 2;
            var before = dbContext.Comment.Count();

            await _service.Comment.RemoveComment(id);

            var after = dbContext.Comment.Count() + 1;

            Assert.Equal(before, after);
        }
    }
}
 
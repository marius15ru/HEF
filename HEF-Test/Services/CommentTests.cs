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
        private readonly IServiceWrapper _service;
        private readonly RepoContext _context;
        private readonly Faker<Comment> _commentGenerator;

        public CommentTests()
        {
            _context = dbContext;
            _service = new ServiceWrapper(_context);

            IModelGenerator _modelGen = new ModelGenerator();
            _commentGenerator = _modelGen.GetCommentGenerator;

            PopulateDB();
        }

        private void PopulateDB()
        {
            dbContext.AddRange(_commentGenerator.Generate(2));
            dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAllComments()
        {
            var result = await _service.Comment.GetAllComments();

            Assert.IsType<List<Comment>>(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetCommentById()
        {
            var id = 1;
            var result = await _service.Comment.GetCommentById(id);

            Assert.IsType<Comment>(result);
            Assert.Equal(id, result.Id);
        }

        [Fact]
        public async Task GiveValidRequest_CreatesComment()
        {
            var enitity = _commentGenerator.Generate();

            await _service.Comment.AddComment(enitity);

            var lastId = _context.Comment.OrderBy(x => x.Id).Last().Id;

            Assert.Equal(3, _context.Comment.Count());
            Assert.Equal(enitity.Id, lastId);
        }

        [Fact]
        public async Task GivenValidInput_UpdatesComment()
        {
            int id = 2;
            var enitity = await _service.Comment.GetCommentById(id);
            var Text = "Ný Comment";
            enitity.Text = Text;

            await _service.Comment.UpdateComment(id, enitity);
            var result = _context.Comment.Find(id).Text;

            Assert.Equal(Text, result);
        }

        [Fact]
        public async Task GivenValidId_DeletesComment()
        {
            int id = 2;
            await _service.Comment.RemoveComment(id);
            var after_delete = await _service.Comment.GetCommentById(id);

            Assert.Null(after_delete);
        }

        [Fact]
        public async Task GivenInvalidId_ThrowsArgumentNullException()
        {
            int id = -1;
            // await _service.Comment.RemoveComment(id);
        }
    }
}

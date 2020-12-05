using System.Collections.Generic;
using System.Threading.Tasks;
using HEF_API.Models;
using Microsoft.EntityFrameworkCore;

namespace HEF_API.Services
{
    public interface ICommentService
    {
        public Task<List<Comment>> GetAllComments(string sortBy);
        public Task<Comment> GetCommentById(int id);
        public Task AddComment(Comment a);
        public Task UpdateComment(int id, Comment value);
        public Task RemoveComment(int id);
    }
    
    public class CommentService: ServiceBase<Comment>, ICommentService
    {
        public CommentService(RepoContext context)
            :base(context)
        { }

        public async Task<List<Comment>> GetAllComments(string sortBy) => await GetAll(sortBy).ToListAsync();
        public async Task<Comment> GetCommentById(int id) => await GetById(id);
        public async Task AddComment(Comment value) => await Add(value);
        public async Task UpdateComment(int id, Comment entity) => await Update(id, entity);
        public async Task RemoveComment(int id) => await Remove(id);
    }
}

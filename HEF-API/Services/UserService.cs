using System.Collections.Generic;
using System.Threading.Tasks;
using HEF_API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace HEF_API.Services
{
    public interface IUserService
    {
        Task<List<User>> GetAllUsers(string sortBy = null);
        Task<User> GetUserById(int id);
        Task AddUser(User a);
        Task UpdateUser(int id, User value);
        Task RemoveUser(int id);
        Task<List<Job>> GetUserJobsByUserId(int userId);
    }
    
    public class UserService: ServiceBase<User>, IUserService
    {
        public UserService(RepoContext context)
            :base(context)
        { }

        public async Task<List<User>> GetAllUsers(string sortBy = null) => await GetAll(sortBy).ToListAsync();
        public async Task<User> GetUserById(int id) => await GetById(id);
        public async Task AddUser(User value) => await Add(value);
        public async Task UpdateUser(int id, User entity) => await Update(id, entity);
        public async Task RemoveUser(int id) => await Remove(id);
        public async Task<List<Job>> GetUserJobsByUserId(int userId) 
            => await BaseContext.Job_Assignments.Where(x => x.UserId == userId)
                                                .Select(x => x.Job)
                                                .ToListAsync();
    }
}

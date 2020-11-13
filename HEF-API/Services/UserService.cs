using System.Collections.Generic;
using System.Threading.Tasks;
using HEF_API.Models;
using Microsoft.EntityFrameworkCore;

namespace HEF_API.Services
{
    public interface IUserService
    {
        public Task<List<User>> GetAllUsers();
        public Task<User> GetUserById(int id);
        public Task AddUser(User a);
        public Task UpdateUser(int id, User value);
        public Task RemoveUser(int id);
    }
    
    public class UserService: ServiceBase<User>, IUserService
    {
        public UserService(RepoContext context)
            :base(context)
        { }

        public async Task<List<User>> GetAllUsers() => await GetAll().ToListAsync();
        public async Task<User> GetUserById(int id) => await GetById(id);
        public async Task AddUser(User value) => await Add(value);
        public async Task UpdateUser(int id, User entity) => await Update(id, entity);
        public async Task RemoveUser(int id) => await Remove(id);
    }
}

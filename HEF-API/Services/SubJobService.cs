using System.Collections.Generic;
using System.Threading.Tasks;
using HEF_API.Models;
using Microsoft.EntityFrameworkCore;

namespace HEF_API.Services
{
    public interface ISubJobService
    {
        public Task<List<SubJob>> GetAllSubJobs(string sortBy);
        public Task<SubJob> GetSubJobById(int id);
        public Task AddSubJob(SubJob a);
        public Task UpdateSubJob(int id, SubJob value);
        public Task RemoveSubJob(int id);
    }
    
    public class SubJobService: ServiceBase<SubJob>, ISubJobService
    {
        public SubJobService(RepoContext context)
            :base(context)
        { }

        public async Task<List<SubJob>> GetAllSubJobs(string sortBy) => await GetAll(sortBy).ToListAsync();
        public async Task<SubJob> GetSubJobById(int id) => await GetById(id);
        public async Task AddSubJob(SubJob value) => await Add(value);
        public async Task UpdateSubJob(int id, SubJob entity) => await Update(id, entity);
        public async Task RemoveSubJob(int id) => await Remove(id);
    }
}

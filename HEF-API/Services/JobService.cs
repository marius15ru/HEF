using System.Collections.Generic;
using System.Threading.Tasks;
using HEF_API.Models;
using Microsoft.EntityFrameworkCore;

namespace HEF_API.Services
{
    public interface IJobService
    {
        public Task<List<Job>> GetAllJobs();
        public Task<Job> GetJobById(int id);
        public Task AddJob(Job a);
        public Task UpdateJob(int id, Job value);
        public Task RemoveJob(int id);
    }

    public class JobService : ServiceBase<Job>, IJobService
    {
        public JobService(RepoContext context)
            : base(context)
        { }

        public async Task<List<Job>> GetAllJobs() => await GetAll().ToListAsync();
        public async Task<Job> GetJobById(int id) => await GetById(id);
        public async Task AddJob(Job value) => await Add(value);
        public async Task UpdateJob(int id, Job entity) => await Update(id, entity);
        public async Task RemoveJob(int id) => await Remove(id);
    }
}   
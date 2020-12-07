using System.Collections.Generic;
using System.Threading.Tasks;
using HEF_API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace HEF_API.Services
{
    public interface IJobService
    {
        Task<List<Job>> GetAllJobs(string sortBy = null);
        Task<Job> GetJobById(int id);
        Task AddJob(Job a);
        Task UpdateJob(int id, Job value);
        Task RemoveJob(int id);
        Task<List<User>> GetJobUsersByJobId(int jobId);
        Task AddJobUser(Job_Assignments value);
        Task RemoveJobUser(int jobId, int userId);
    }

    public class JobService : ServiceBase<Job>, IJobService
    {
        public JobService(RepoContext context)
            : base(context)
        { }

        public async Task<List<Job>> GetAllJobs(string sortBy = null) => await GetAll(sortBy).ToListAsync();
        public async Task<Job> GetJobById(int id) => await GetById(id);
        public async Task AddJob(Job value) => await Add(value);

        public async Task UpdateJob(int id, Job entity) => await Update(id, entity);
        public async Task RemoveJob(int id) => await Remove(id);
        public async Task<List<User>> GetJobUsersByJobId(int jobId)
            => await BaseContext.Job_Assignments.Where(x => x.JobId == jobId)
                                                .Select(x => x.User)
                                                .ToListAsync();
        public async Task AddJobUser(Job_Assignments value)
        {
            value.Job = await GetById(value.UserId);
            value.User = await BaseContext.User.FindAsync(value.UserId);

            BaseContext.Job_Assignments.Add(value);
            await BaseContext.SaveChangesAsync();
        }

        public async Task RemoveJobUser(int jobId, int userId)
        {
            var jobAssignment = await BaseContext.Job_Assignments.FindAsync(jobId, userId);
            BaseContext.Job_Assignments.Remove(jobAssignment);
            await BaseContext.SaveChangesAsync();

        }
    }
}   
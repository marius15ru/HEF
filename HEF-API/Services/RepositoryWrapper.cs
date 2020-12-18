using HEF_API.Models;
using System.Threading.Tasks;

namespace HEF_API.Services
{
    public interface IRepositoryWrapper
    {
        IRepository<Area> Area { get; }
        IRepository<Comment> Comment { get; }
        IRepository<Equipment> Equipment { get; }
        IRepository<Job> Job { get; }
        IRepository<Plant> Plant { get; }
        IRepository<Station> Station { get; }
        IRepository<SubJob> SubJob { get; }
        IRepository<User> User { get; }
        IRepository<Job_Assignments> UserJobs { get; }
        Task Save();
    }

    public class RepositoryWrapper : IRepositoryWrapper
    {
        private RepoContext _context = null;
        private IRepository<Area> _area;
        private IRepository<Comment> _comment = null;
        private IRepository<Equipment> _equipment = null;
        private IRepository<Job> _job = null;
        private IRepository<Plant> _plant = null;
        private IRepository<Station> _station = null;
        private IRepository<SubJob> _subjob = null;
        private IRepository<User> _user = null;
        private IRepository<Job_Assignments> _userjobs = null;

        public RepositoryWrapper(RepoContext context) => _context = context;
        public async Task Save() => await _context.SaveChangesAsync();
        public IRepository<Area> Area => _area ??= new BaseRepository<Area>(_context);
        public IRepository<Comment> Comment => _comment ??= new BaseRepository<Comment>(_context);
        public IRepository<Equipment> Equipment => _equipment ??= new BaseRepository<Equipment>(_context);
        public IRepository<Job> Job => _job ??= new BaseRepository<Job>(_context);
        public IRepository<Plant> Plant => _plant ??= new BaseRepository<Plant>(_context);
        public IRepository<Station> Station => _station ??= new BaseRepository<Station>(_context);
        public IRepository<SubJob> SubJob => _subjob ??= new BaseRepository<SubJob>(_context);
        public IRepository<User> User => _user ??= new BaseRepository<User>(_context);
        public IRepository<Job_Assignments> UserJobs => _userjobs ??= new BaseRepository<Job_Assignments>(_context);
    }
}

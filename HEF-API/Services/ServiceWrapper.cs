using System;
using System.Threading.Tasks;
using HEF_API.Models;

namespace HEF_API.Services
{
    public interface IServiceWrapper
    {
        IAreaService Area { get; }
        ICommentService Comment { get; }
        IEquipmentService Equipment { get; }
        IJobService Job { get; }
        IPlantService Plant { get; }
        IStationService Station { get; }
        ISubJobService SubJob { get; }
        IUserService User { get; }
        Task Save();
    }

    public class ServiceWrapper: IServiceWrapper
    {
        private readonly RepoContext _context = null;
        private readonly IAreaService _area = null;
        private readonly ICommentService _comment = null;
        private readonly IEquipmentService _equipment = null;
        private readonly IJobService _job = null;
        private readonly IPlantService _plant = null;
        private readonly IStationService _station = null;
        private readonly ISubJobService _subjob = null;
        private readonly IUserService _user = null;

        public ServiceWrapper(RepoContext context) => _context = context;
        public async Task Save() => await _context.SaveChangesAsync();

        public IAreaService Area => _area ?? new AreaService(_context);
        public ICommentService Comment => _comment ?? new CommentService(_context);
        public IEquipmentService Equipment => _equipment ?? new EquipmentService(_context);
        public IJobService Job => _job ?? new JobService(_context);
        public IPlantService Plant => _plant ?? new PlantService(_context);
        public IStationService Station => _station ?? new StationService(_context);
        public ISubJobService SubJob => _subjob ?? new SubJobService(_context);
        public IUserService User => _user ?? new UserService(_context);
    }
}

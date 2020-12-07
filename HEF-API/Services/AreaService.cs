using System.Collections.Generic;
using System.Threading.Tasks;
using HEF_API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace HEF_API.Services
{
    public interface IAreaService
    {
        Task<List<Area>> GetAllAreas(string sortBy = null);
        Task<Area> GetAreaById(int id);
        Task AddArea(Area a);
        Task UpdateArea(int id, Area value);
        Task RemoveArea(int id);
    }

    public class AreaService : ServiceBase<Area>, IAreaService
    {
        public AreaService(RepoContext context)
            : base(context)
        { }

        public async Task<List<Area>> GetAllAreas(string sortBy = null) => await GetAll(sortBy).ToListAsync();
        public async Task<Area> GetAreaById(int id) => await GetById(id);
        public async Task AddArea(Area value) => await Add(value);
        public async Task UpdateArea(int id, Area entity) => await Update(id, entity);
        public async Task RemoveArea(int id) => await Remove(id);
    }
}
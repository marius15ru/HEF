using System.Collections.Generic;
using System.Threading.Tasks;
using HEF_API.Models;
using Microsoft.EntityFrameworkCore;

namespace HEF_API.Services
{
    public interface IAreaService
    {
        public Task<List<Area>> GetAllAreas();
        public Task<Area> GetAreaById(int id);
        public Task AddArea(Area a);
        public Task UpdateArea(int id, Area value);
        public Task RemoveArea(int id);
    }
    
    public class AreaService: ServiceBase<Area>, IAreaService
    {
        public AreaService(RepoContext context)
            :base(context)
        { }

        public async Task<List<Area>> GetAllAreas() => await GetAll().ToListAsync();
        public async Task<Area> GetAreaById(int id) => await GetById(id);
        public async Task AddArea(Area value) => await Add(value);
        public async Task UpdateArea(int id, Area entity) => await Update(id, entity);
        public async Task RemoveArea(int id) => await Remove(id);
    }
}

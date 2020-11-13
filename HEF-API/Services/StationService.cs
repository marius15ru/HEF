
using System.Collections.Generic;
using System.Threading.Tasks;
using HEF_API.Models;
using Microsoft.EntityFrameworkCore;

namespace HEF_API.Services
{
    public interface IStationService
    {
        public Task<List<Station>> GetAllStations();
        public Task<Station> GetStationById(int id);
        public Task AddStation(Station a);
        public Task UpdateStation(int id, Station value);
        public Task RemoveStation(int id);
    }

    public class StationService : ServiceBase<Station>, IStationService
    {
        public StationService(RepoContext context)
            : base(context)
        { }

        public async Task<List<Station>> GetAllStations() => await GetAll().ToListAsync();
        public async Task<Station> GetStationById(int id) => await GetById(id);
        public async Task AddStation(Station value) => await Add(value);
        public async Task UpdateStation(int id, Station entity) => await Update(id, entity);
        public async Task RemoveStation(int id) => await Remove(id);
    }
}

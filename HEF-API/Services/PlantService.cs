using System.Collections.Generic;
using System.Threading.Tasks;
using HEF_API.Models;
using Microsoft.EntityFrameworkCore;

namespace HEF_API.Services
{
    public interface IPlantService
    {
        public Task<List<Plant>> GetAllPlants();
        public Task<Plant> GetPlantById(int id);
        public Task AddPlant(Plant a);
        public Task UpdatePlant(int id, Plant value);
        public Task RemovePlant(int id);
    }
    
    public class PlantService: ServiceBase<Plant>, IPlantService
    {
        public PlantService(RepoContext context)
            :base(context)
        { }

        public async Task<List<Plant>> GetAllPlants() => await GetAll().ToListAsync();
        public async Task<Plant> GetPlantById(int id) => await GetById(id);
        public async Task AddPlant(Plant value) => await Add(value);
        public async Task UpdatePlant(int id, Plant entity) => await Update(id, entity);
        public async Task RemovePlant(int id) => await Remove(id);
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using HEF_API.Models;
using Microsoft.EntityFrameworkCore;

namespace HEF_API.Services
{
    public interface IEquipmentService
    {
        public Task<List<Equipment>> GetAllEquipments(string sortBy = null);
        public Task<Equipment> GetEquipmentById(int id);
        public Task AddEquipment(Equipment a);
        public Task UpdateEquipment(int id, Equipment value);
        public Task RemoveEquipment(int id);
    }
    
    public class EquipmentService: ServiceBase<Equipment>, IEquipmentService
    {
        public EquipmentService(RepoContext context)
            : base(context)
        { }

        public async Task<List<Equipment>> GetAllEquipments(string sortBy = null) => await GetAll(sortBy).ToListAsync();
        public async Task<Equipment> GetEquipmentById(int id) => await GetById(id);
        public async Task AddEquipment(Equipment value) => await Add(value);
        public async Task UpdateEquipment(int id, Equipment entity) => await Update(id, entity);
        public async Task RemoveEquipment(int id) => await Remove(id);
    }
}

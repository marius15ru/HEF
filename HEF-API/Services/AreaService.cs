using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HEF_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace HEF_API.Services
{
    
    public interface IAreaService
    {
        public Task<List<Area>> GetAllAreas();
        public Task<Area> GetAreaById(int id);
        public Task AddArea(Area a);
        public Task EditArea(int id, Area value);
        public Task RemoveArea(int id);
    }
    
    public class AreaService: IAreaService
    {
        private readonly RepoContext _context;

        public AreaService(RepoContext context)
        {
            _context = context;
        }

        public async Task<List<Area>> GetAllAreas()
        {
            return await _context.Area.ToListAsync();
        }
        
        public async Task<Area> GetAreaById(int id)
        {
            return await _context.Area.Where(x => x.Id == id).SingleOrDefaultAsync();
        }

        public async Task AddArea(Area value)
        {
            _context.Area.Add(new Area { Name = value.Name });
            await _context.SaveChangesAsync();
        }

        public async Task EditArea(int id, Area value)
        {
            var entity = _context.Area.SingleOrDefault(x => x.Id == id);
            if (entity != null)
            {
                entity.Name = value.Name ?? entity.Name;

                _context.Area.Update(entity);
                await _context.SaveChangesAsync();
            }
        }

        public async Task RemoveArea(int id)
        {
            var value = _context.Area.SingleOrDefault(x => x.Id == id);
            if (value == null)
            {
                await _context.DisposeAsync();
            }
            else
            {
                _context.Remove(value);
                await _context.SaveChangesAsync();
            }
        }
    }
}

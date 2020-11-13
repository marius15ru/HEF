using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace HEF_API.Services
{

    public interface IBaseService<T>
    {
        public IQueryable<T> GetAll();
        public IQueryable<T> GetByCondition(Expression<Func<T, bool>> expression);
        public void Add(T entity);
        public void Update(T entity);
        public void Remove(T entity);
    }

    public class ServiceBase<T> where T : class
    {
        protected readonly RepoContext _context;
        public ServiceBase(RepoContext context) => _context = context;

        public IQueryable<T> GetAll() => this._context.Set<T>().AsNoTracking();
        public IQueryable<T> GetByCondition(Expression<Func<T, bool>> expression) => this._context.Set<T>().Where(expression).AsNoTracking();

        public async Task<T> GetById(int id) => await this._context.Set<T>().FindAsync(id);

        public async Task Add(T entity)
        {
            this._context.Set<T>().Add(entity);
            await this._context.SaveChangesAsync();
        }

        public async Task Update(int id, T values)
        {
            var entity = _context.Set<T>().Find(id);
            foreach (PropertyInfo prop in entity.GetType().GetProperties())
            {
                var n = prop.GetValue(values, null);

                if (n != null && prop.Name != "Id")
                    prop.SetValue(entity, n);
            }

            if (entity != null)
            {
                this._context.Set<T>().Update(entity);
                await this._context.SaveChangesAsync();
            }
        }

        public async Task Remove(int id)
        {
            var entity = this._context.Set<T>().Find(id);
            this._context.Set<T>().Remove(entity);
            await this._context.SaveChangesAsync();
        }
    }

    
}

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace HEF_API.Services
{
    public interface IRepository<T> where T : class
    {
        void Delete(T entity);
        void Delete(object id);
        Task<IEnumerable<T>> Get(
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "");
        Task<T> GetByID(object id);
        void Insert(T entity);
        void Update(T entity);
        Task Save();
    }

    public class BaseRepository<T> : IRepository<T> where T : class
    {
        internal RepoContext context;
        internal DbSet<T> dbSet;
        public BaseRepository(RepoContext context)
        {
            this.context = context;
            this.dbSet = context.Set<T>();
        }

        public async Task<IEnumerable<T>> Get(
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includesProperties = "")
        {
            IQueryable<T> query = dbSet;

            if (filter != null)
                query = query.Where(filter);

            if (includesProperties != null)
                foreach (var inlcudeProperty in includesProperties.Split
                    (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(inlcudeProperty);
                }


            if (orderBy != null)
                return await orderBy(query).ToListAsync();
            else
                return await query.ToListAsync();
        }

        public async Task<T> GetByID(object id) => await dbSet.FindAsync(id);

        public virtual void Insert(T entity) => dbSet.Add(entity);

        public virtual void Update(T entity)
        {
            dbSet.Attach(entity);
            context.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(object id)
        {
            T entity = dbSet.Find(id);
            Delete(entity);
        }

        public virtual void Delete(T entity)
        {
            if (context.Entry(entity).State == EntityState.Detached)
                dbSet.Attach(entity);

            dbSet.Remove(entity);
        }

        public async Task Save() => await this.context.SaveChangesAsync();
    }
}

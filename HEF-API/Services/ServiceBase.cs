﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace HEF_API.Services
{

    public interface IServiceBase<T>
    {
        IQueryable<T> GetAll();
        IQueryable<T> GetByCondition(Expression<Func<T, bool>> expression);
        Task Add(T entity);
        Task Update(int id, T values);
        Task Remove(int id);
    }

    public class ServiceBase<T>: IServiceBase<T> where T : class
    {
        protected RepoContext BaseContext { get; set; }
        public ServiceBase(RepoContext context) => this.BaseContext = context;

        public IQueryable<T> GetAll() => this.BaseContext.Set<T>().AsNoTracking();

        public IQueryable<T> GetByCondition(Expression<Func<T, bool>> expression) => this.BaseContext.Set<T>().Where(expression).AsNoTracking();

        public async Task<T> GetById(int id) => await this.BaseContext.Set<T>().FindAsync(id);

        public async Task Add(T entity)
        {
            this.BaseContext.Set<T>().Add(entity);
            await this.BaseContext.SaveChangesAsync();
        }

        public async Task Update(int id, T values)
        {
            var entity = BaseContext.Set<T>().Find(id);
            foreach (PropertyInfo prop in entity.GetType().GetProperties())
            {
                var n = prop.GetValue(values, null);

                if (n != null && prop.Name != "Id")
                    prop.SetValue(entity, n);
            }

            if (entity != null)
            {
                this.BaseContext.Set<T>().Update(entity);
                await this.BaseContext.SaveChangesAsync();
            }
        }

        public async Task Remove(int id)
        {
            var entity = this.BaseContext.Set<T>().Find(id);
            this.BaseContext.Set<T>().Remove(entity);
            await this.BaseContext.SaveChangesAsync();
        }
    }
}
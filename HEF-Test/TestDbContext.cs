using HEF_API.Services;
using Microsoft.EntityFrameworkCore;
using System;

namespace HEF_Test
{
    public class TestDbContext: IDisposable
    {
        protected readonly RepoContext dbContext;
        protected readonly IRepositoryWrapper _repositoryWrapper;

        public TestDbContext()
        {
            var options = new DbContextOptionsBuilder<RepoContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
            dbContext = new RepoContext(options);
            dbContext.Database.EnsureCreated();

            _repositoryWrapper = new RepositoryWrapper(dbContext);
        }

        public void Dispose()
        {
            dbContext.Dispose();
        }
    }
}

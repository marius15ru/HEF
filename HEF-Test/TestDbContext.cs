using HEF_API.Services;
using Microsoft.EntityFrameworkCore;
using System;

namespace HEF_Test
{
    public class TestDbContext
    {
        protected readonly RepoContext dbContext;

        public TestDbContext()
        {
            var options = new DbContextOptionsBuilder<RepoContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
            dbContext = new RepoContext(options);
            dbContext.Database.EnsureCreated();
        }
    }
}

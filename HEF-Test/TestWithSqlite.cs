using System;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using HEF_API.Models;
using HEF_API.Services;

namespace HEF_Test
{
    public class TestWithSqlite: IDisposable
    {
        private const string testMemoryConnectionString = "DataSource=:memory:";
        private readonly SqliteConnection _connection;

        protected readonly RepoContext dbContext;

        public TestWithSqlite()
        {
            _connection = new SqliteConnection(testMemoryConnectionString);
            _connection.Open();
            var options = new DbContextOptionsBuilder<RepoContext>()
                .UseSqlite(_connection)
                .Options;
            dbContext = new RepoContext(options);
            dbContext.Database.EnsureCreated();
        }

        public void Dispose()
        {
            _connection.Close();
        }
    }
}

using System;
using System.Threading.Tasks;
using HEF_API.Models;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Xunit;
using System.Linq;

namespace HEF_Test
{
    public class DbContextTests : TestWithSqlite
    {
        [Fact]
        public async Task DatabaseIsAvailableAndCanBeConnectedTo()
        {
            Assert.True(await dbContext.Database.CanConnectAsync());
        }
    }

    public class ItemConfigurationTests : TestWithSqlite
    {
        [Fact]
        public void TableShouldGetCreated()
        {
            Assert.False(dbContext.Areas.Any());
        }

        [Fact]
        public void NameIsRequired()
        {
            var newItem = new Area();
            dbContext.Areas.Add(newItem);

            //Assert.Throws<DbUpdateException>(() => dbContext.SaveChanges());
        }

        [Fact]
        public void AddedItemShouldGetGeneratedId()
        {
            var newItem = new Area() { Name = "Testitem" };
            dbContext.Areas.Add(newItem);
            dbContext.SaveChanges();

            Assert.NotEqual(0, newItem.Id);
        }

        [Fact]
        public void AddedItemShouldGetPersisted()
        {
            var newItem = new Area() { Name = "Testitem" };
            dbContext.Areas.Add(newItem);
            dbContext.SaveChanges();

            Assert.Equal(newItem, dbContext.Areas.Find(newItem.Id));
            Assert.Equal(1, dbContext.Areas.Count());
        }
    }
}

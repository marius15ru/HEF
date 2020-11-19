using System;
using System.Threading.Tasks;
using Bogus;
using HEF_API.Services;
using Xunit;
using Xunit.Abstractions;

namespace HEF_Test
{
    public interface IBaseTests<T>
    {

    }

    public abstract class BaseTests<T>: TestWithSqlite where T : class
    {
        protected ITestOutputHelper Output { get; set; }
        protected IServiceWrapper Service { get; set; }
        protected IModelGenerator ModelGen { get; set; }

        protected Faker<T> FakeModel { get; set; }

        public BaseTests(ITestOutputHelper output, IModelGenerator modGen)
        {
            this.Output = output;
            this.ModelGen = modGen;
        }

        protected void PopulateDB()
        {
            dbContext.Set<T>().Add(FakeModel.Generate());
            dbContext.Set<T>().Add(FakeModel.Generate());
        }
    }
}

using System;
using Bogus;
using HEF_API.Models;

namespace HEF_Test
{
    public interface IModelGenerator
    {
        Faker<Comment> GetCommentGenerator { get; }
        Faker<Area> GetAreaGenerator { get; }
        Faker<User> GetUserGenerator { get; }
    }

    public class ModelGenerator : IModelGenerator
    {
        public ModelGenerator()
        {
            Randomizer.Seed = new Random(8675309);
        }

        public Faker<Comment> GetCommentGenerator => CommentGenerator();
        public Faker<Area> GetAreaGenerator => AreaGenerator();
        public Faker<User> GetUserGenerator => UserGenerator();

        private Faker<Comment> CommentGenerator()
        {
            var userIDs = new[] { 1, 2, 3 };//;_user_fk_service.GetAllUsers().Result.Select(x => x.Id).AsEnumerable();
            var jobIDs = new[] { 1, 2, 3 };// _job_fk_service.GetAllJobs().Result.Select(x => x.Id).AsEnumerable();
            var commentIds = 1;
            var fakeComment = new Faker<Comment>()
                .StrictMode(true)
                .RuleFor(o => o.Id, f => commentIds++)
                .RuleFor(x => x.UserId, y => y.PickRandom(userIDs))
                .RuleFor(x => x.JobId, y => y.PickRandom(jobIDs))
                .RuleFor(x => x.Text, y => y.Lorem.Text())
                .RuleFor(x => x.Seen, y => y.Random.Bool());
            return fakeComment;
        }

        private Faker<Area> AreaGenerator()
        {
            var Ids = 1;
            var fakeArea = new Faker<Area>()
                .StrictMode(true)
                .RuleFor(o => o.Id, f => Ids++)
                .RuleFor(x => x.Name, y => y.Address.StreetAddress());
            return fakeArea;
        }

        private Faker<User> UserGenerator()
        {
            var Ids = 1;
            var fakeUser = new Faker<User>()
                .StrictMode(true)
                .RuleFor(o => o.Id, f => Ids++)
                .RuleFor(x => x.Name, y => y.Name.FullName())
                .RuleFor(x => x.Role, y => y.PickRandom<Enums.Role>())
                .RuleFor(x => x.Status, y => y.PickRandom<Enums.UserStatus>());
            return fakeUser;
        }
    }
}

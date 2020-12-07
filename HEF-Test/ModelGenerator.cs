using System;
using Bogus;
using HEF_API.Models;

namespace HEF_Test
{
    public interface IModelGenerator
    {
        Faker<Comment> GetCommentGenerator { get; }
        Faker<Area> GetAreaGenerator { get; }
        Faker<Equipment> GetEquipmentGenerator { get; }
        Faker<Job> GetJobGenerator { get; }
        Faker<Plant> GetPlantGenerator { get; }
        Faker<Station> GetStationGenerator { get; }
        Faker<SubJob> GetSubJobGenerator { get; }
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
        public Faker<Equipment> GetEquipmentGenerator => EquipmentGenerator();
        public Faker<Job> GetJobGenerator => JobGenerator();
        public Faker<Plant> GetPlantGenerator => PlantGenerator();
        public Faker<Station> GetStationGenerator => StationGenerator();
        public Faker<SubJob> GetSubJobGenerator => SubJobGenerator();
        public Faker<User> GetUserGenerator => UserGenerator();

        private Faker<Area> AreaGenerator()
        {
            var Ids = 1;
            var fakeArea = new Faker<Area>()
                .StrictMode(true)
                .RuleFor(o => o.Id, f => Ids++)
                .RuleFor(x => x.Name, y => y.Address.StreetAddress());
            return fakeArea;
        }
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
        private Faker<Equipment> EquipmentGenerator()
        {
            var Ids = 1;
            var fakeUser = new Faker<Equipment>()
                .StrictMode(true)
                .RuleFor(o => o.Id, f => Ids++)
                .RuleFor(x => x.StationId, y => new Station().Id)
                .RuleFor(x => x.Name, y => y.Commerce.ProductMaterial())
                .RuleFor(x => x.Model, y => y.Date.Past(40))
                .RuleFor(x => x.Manufacturer, y => y.Company.CompanyName())
                .RuleFor(x => x.Operation, y => y.Lorem.Sentence(10))
                .RuleFor(x => x.LastCheck, y => y.Date.Past(5));
            return fakeUser;
        }
        private Faker<Job> JobGenerator()
        {
            var Ids = 1;
            var fakeUser = new Faker<Job>()
                .StrictMode(true)
                .RuleFor(o => o.Id, f => Ids++)
                .RuleFor(x => x.StationId, y => new Station().Id)
                .RuleFor(x => x.Name, y => y.Name.JobTitle())
                .RuleFor(x => x.Description, y => y.Name.JobDescriptor())
                .RuleFor(x => x.Status, y => y.PickRandom<Enums.JobStatus>())
                .RuleFor(x => x.CompleteBy, y => y.Date.Past(1))
                .RuleFor(x => x.Recurring, y => y.PickRandom<Enums.Recurring>())
                .RuleFor(x => x.Duration, y => y.Random.Replace("##:##"))
                .RuleFor(x => x.EmergencyJob, y => y.Random.Bool())
                .RuleFor(x => x.HasComments, y => y.Random.Bool())
                .RuleFor(x => x.LastCheck, y => y.Date.Past(5));
            return fakeUser;
        }
        private Faker<Plant> PlantGenerator()
        {
            var Ids = 1;
            var fakeArea = new Faker<Plant>()
                .StrictMode(true)
                .RuleFor(o => o.Id, f => Ids++)
                .RuleFor(x => x.Name, y => y.Commerce.Department());
            return fakeArea;
        }
        private Faker<Station> StationGenerator()
        {
            var Ids = 1;
            var fakeStation = new Faker<Station>()
                .StrictMode(true)
                .RuleFor(o => o.Id, f => Ids++)
                .RuleFor(x => x.AreaId, y => new Area().Id)
                .RuleFor(x => x.PlantId, y => new Plant().Id)
                .RuleFor(x => x.Name, y => y.Address.SecondaryAddress())
                .RuleFor(x => x.Address, y => y.Address.StreetAddress())
                .RuleFor(x => x.Coordinates, y => y.Address.Latitude().ToString() + ", " + y.Address.Longitude().ToString())
                .RuleFor(x => x.LocationPrecise, y => y.Lorem.Sentence(12))
                .RuleFor(x => x.Description, y => y.Lorem.Sentence(12));
            return fakeStation;
        }
        private Faker<SubJob> SubJobGenerator()
        {
            var Ids = 1;
            var fakeSubJob = new Faker<SubJob>()
                .StrictMode(true)
                .RuleFor(o => o.Id, f => Ids++)
                .RuleFor(x => x.JobId, y => new Job().Id)
                .RuleFor(x => x.EquipmentId, y => new Equipment().Id)
                .RuleFor(x => x.Name, y => y.Commerce.Product())
                .RuleFor(x => x.Description, y => y.Commerce.ProductDescription())
                .RuleFor(x => x.Status, y => y.PickRandom<Enums.JobStatus>())
                .RuleFor(x => x.Unit, y => y.PickRandom<Enums.Unit>())
                .RuleFor(x => x.Value, y => y.Random.Double(1, 100));
            return fakeSubJob;
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

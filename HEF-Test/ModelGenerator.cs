using System;
using System.Collections.Generic;
using Bogus;
using HEF_API.Models;

namespace HEF_Test
{
    public static class ModelGenerator
    {
        public static bool strictMode = true;

        public static Faker<Area> AreaGenerator()
        {
            var Ids = 1;
            var fakeArea = new Faker<Area>()
                .StrictMode(strictMode)
                .RuleFor(o => o.Id, f => Ids++)
                .RuleFor(x => x.Name, y => y.Address.StreetAddress());
            return fakeArea;
        }
        public static Faker<Comment> CommentGenerator()
        {
            var user = UserGenerator();
            var job = JobGenerator();

            var commentIds = 1;
            var fakeComment = new Faker<Comment>()
                .StrictMode(strictMode)
                .RuleFor(o => o.Id, f => commentIds++)
                .RuleFor(x => x.User, user.Generate())
                .RuleFor(x => x.Job, job.Generate())
                .RuleFor(x => x.UserId, (y, z) => z.User.Id)
                .RuleFor(x => x.JobId, (y, z) => z.Job.Id)
                .RuleFor(x => x.Text, y => y.Lorem.Text())
                .RuleFor(x => x.Seen, y => y.Random.Bool());
            return fakeComment;
        }
        public static Faker<Equipment> EquipmentGenerator()
        {
            var station = StationGenerator();

            var Ids = 1;
            var fakeUser = new Faker<Equipment>()
                .StrictMode(strictMode)
                .RuleFor(o => o.Id, f => Ids++)
                .RuleFor(x => x.Station, station.Generate())
                .RuleFor(x => x.StationId, (y, z) => z.Station.Id)
                .RuleFor(x => x.Name, y => y.Lorem.Word())
                .RuleFor(x => x.Model, y => y.Date.Past(40))
                .RuleFor(x => x.Manufacturer, y => y.Lorem.Word())
                .RuleFor(x => x.Operation, y => y.Lorem.Sentence(10))
                .RuleFor(x => x.LastCheck, y => y.Date.Past(5));
            return fakeUser;
        }
        public static Faker<Job> JobGenerator()
        {
            var station = StationGenerator();

            var Ids = 1;
            var fakeUser = new Faker<Job>()
                .StrictMode(strictMode)
                .RuleFor(o => o.Id, f => Ids++)
                .RuleFor(x => x.Station, station.Generate())
                .RuleFor(x => x.StationId, (y, z) => z.Station.Id)
                .RuleFor(x => x.Name, y => y.Lorem.Sentence(2))
                .RuleFor(x => x.Description, y => y.Lorem.Text())
                .RuleFor(x => x.Status, y => (int)y.PickRandom<Enums.JobStatus>())
                .RuleFor(x => x.CompleteBy, y => y.Date.Past(1))
                .RuleFor(x => x.Recurring, y => y.PickRandom<Enums.Recurring>())
                .RuleFor(x => x.Duration, y => y.Random.Replace("##:##"))
                .RuleFor(x => x.EmergencyJob, y => y.Random.Bool())
                .RuleFor(x => x.HasComments, y => y.Random.Bool())
                .RuleFor(x => x.LastCheck, y => y.Date.Past(5));
            return fakeUser;
        }
        public static Faker<Plant> PlantGenerator()
        {
            var Ids = 1;
            var fakeArea = new Faker<Plant>()
                .StrictMode(strictMode)
                .RuleFor(o => o.Id, f => Ids++)
                .RuleFor(x => x.Name, y => y.Lorem.Word());
            return fakeArea;
        }
        public static Faker<Station> StationGenerator()
        {
            var area = AreaGenerator();
            var plant = PlantGenerator();

            var Ids = 1;
            var fakeStation = new Faker<Station>()
                .StrictMode(strictMode)
                .RuleFor(o => o.Id, f => Ids++)
                .RuleFor(x => x.Area, area.Generate())
                .RuleFor(x => x.Plant, plant.Generate())
                .RuleFor(x => x.AreaId, (y, z) => z.Area.Id)
                .RuleFor(x => x.PlantId, (y, z) => z.Plant.Id)
                .RuleFor(x => x.Name, y => y.Lorem.Sentence(2))
                .RuleFor(x => x.Address, y => y.Address.StreetAddress())
                .RuleFor(x => x.Coordinates, y => y.Address.Latitude().ToString() + ", " + y.Address.Longitude().ToString())
                .RuleFor(x => x.LocationPrecise, y => y.Lorem.Sentence(12))
                .RuleFor(x => x.Description, y => y.Lorem.Sentence(12));
            return fakeStation;
        }
        public static Faker<SubJob> SubJobGenerator()
        {
            var job = JobGenerator();
            var equipment = EquipmentGenerator();

            var Ids = 1;
            var fakeSubJob = new Faker<SubJob>()
                .StrictMode(strictMode)
                .RuleFor(o => o.Id, f => Ids++)
                .RuleFor(x => x.JobId, y => new Job().Id)
                .RuleFor(x => x.EquipmentId, y => new Equipment().Id)
                .RuleFor(x => x.Name, y => y.Lorem.Word())
                .RuleFor(x => x.Description, y => y.Lorem.Text())
                .RuleFor(x => x.Status, y => (int)y.PickRandom<Enums.JobStatus>())
                .RuleFor(x => x.Unit, y => y.PickRandom<Enums.Unit>().ToString())
                .RuleFor(x => x.Value, y => y.Random.Double(1, 100));
            return fakeSubJob;
        }
        public static Faker<User> UserGenerator()
        {
            var Ids = 1;
            var fakeUser = new Faker<User>()
                .StrictMode(strictMode)
                .RuleFor(o => o.Id, f => Ids++)
                .RuleFor(x => x.Name, y => y.Name.FullName())
                .RuleFor(x => x.Email, y => y.Person.Email)
                .RuleFor(x => x.Password, y => y.Lorem.Word())
                .RuleFor(x => x.Role, y => y.PickRandom<Enums.Role>())
                .RuleFor(x => x.Status, y => y.PickRandom<Enums.UserStatus>());
            return fakeUser;
        }
    } 
}

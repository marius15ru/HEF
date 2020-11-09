using System;
namespace HEF_API.Models
{
    public class Enums
    {
        public enum DataOperation
        {
            Undefined = 0,
            Insert = 1,
            Read = 2,
            Update = 3,
            Delete = 4,
            List = 5,
            ListByPlant = 6,
            ListByUser = 7,
            ListByJob = 8

        }

        public enum Role
        {
            Undefined = 0,
            Worker = 1,
            Admin = 2
        }

        public enum UserStatus
        {
            Undefined = 0,
            Available = 1,
            UnAvailable = 2
        }

        public enum JobStatus
        {
            Undefined = 0,
            Pending = 1,
            InProgress = 2,
            OnHold = 3,
            Finished = 4
        }

        public enum Unit
        {
            Undefined = 0,
            Celsius = 1,
            Liters = 2,
            Bar = 3,
            Meters = 4,
            LitersPerSecond = 5

        }
        public enum PlantType
        {
            Undefined = 0,
            Water = 1,
            Data = 2,
            Heat = 3,
            Drainage = 4
        }
        public enum TimeFrame
        {
            Undefined = 0,
            Week = 1,
            TwoWeeks = 2,
            Month = 3,
            TwoMonths = 4,
            ThreeMonths = 5,
            SixMonths = 6,
            Year = 7,
            TwoYears = 8,
            ThreeYears = 9,
            FiveYears = 10,
            TenYears = 11
        }

        public enum Task
        {
            Undefined = 0,
            Clean = 1,
            Vacuum = 2,
            Drawdown = 3,
            MeasureOil = 4,
            MeasureHeat = 5,
            MeasureHeight = 6,
            Mop = 7,
            CheckMotor = 8
        }

    }
}

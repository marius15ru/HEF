using System;
namespace HEF_API.Models
{
    public class Enums
    {
        public enum Role
        {
            Undefined = 0,
            Verkaðili = 1,
            Stjórnandi = 2
        }

        public enum UserStatus
        {
            Undefined = 0,
            Tiltækur = 1,
            Ótiltækur = 2
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

        public enum Recurring
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
    }
}

export enum DataOperation {
    Undefined = 0,
    Insert = 1,
    Read = 2,
    Update = 3,
    Delete = 4,
    List = 5,
    ListByPlant = 6,
    ListByUser = 7,
    ListByJob = 8,

}

export enum Role {
    Undefined = 0,
    Worker = 1,
    Admin = 2,
}

export enum UserStatus {
    Undefined = 0,
    Available = 1,
    UnAvailable = 2,
}

export enum JobStatus {
    Undefined = 0,
    Pending = 1,
    InProgress = 2,
    OnHold = 3,
    Finished = 4,
}

export enum MeasurementType {
    Undefined = 0,
    Celsius = 1,
    Liters = 2,
    Bar = 3,
    Meters = 4,
    LitersPerSecond = 5

}

export enum PlantType {
    Undefined = 0,
    Water = 1,
    Data = 2,
    Heat = 3,
    Drainage = 4
}

export enum recurring {
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

export namespace recurring {

    export function values() {
      return Object.keys(recurring).filter(
        (type) => isNaN(<any>type) && type !== 'values'
      );
    }
  }

export enum Task {
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

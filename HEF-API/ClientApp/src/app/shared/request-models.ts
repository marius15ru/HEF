import { DataOperation } from "./enums";
import { Equipment, Job, Message, Plant, Station, SubJobs, User } from "./models";


export class EquipmentOperationsRequest{
    item: Equipment;
    action: DataOperation;
}

export class EquipmentOperationsResult{
    items: Equipment[];
    message: Message;
}

export class StationOperationsRequest{
    item: Station;
    action: DataOperation;
}

export class StationOperationsResult{
    items: Station[];
    message: Message;
}

export class PlantOperationsRequest{
    item: Plant;
    action: DataOperation;
}

export class PlantOperationsResult{
    items: Plant[];
    message: Message;
}

export class SubJobsOperationsRequest{
    item: SubJobs;
    action: DataOperation;
}

export class SubJobsOperationsResult{
    items: SubJobs[];
    message: Message;
}

export class UserOperationsRequest{
    item: User;
    action: DataOperation;
}

export class UserOperationsResult{
    items: User[];
    message: Message;
}

export class JobOperationsRequest{
    item: Job;
    action: DataOperation;
}

export class JobOperationsResult{
    items: Job[];
    message: Message;
}



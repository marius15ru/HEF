import { DataOperation } from "./enums";
import { Equipment, Location, Message, Plant, SubWorkOrder, User, WorkOrder } from "./models";


export class EquipmentOperationsRequest{
    item: Equipment;
    action: DataOperation;
}

export class EquipmentOperationsResult{
    items: Equipment[];
    message: Message;
}

export class LocationOperationsRequest{
    item: Location;
    action: DataOperation;
}

export class LocationOperationsResult{
    items: Location[];
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

export class SubWorkOrderOperationsRequest{
    item: SubWorkOrder;
    action: DataOperation;
}

export class SubWorkOrderOperationsResult{
    items: SubWorkOrder[];
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

export class WorkOrderOperationsRequest{
    item: WorkOrder;
    action: DataOperation;
}

export class WorkOrderOperationsResult{
    items: WorkOrder[];
    message: Message;
}



import { MeasurementType, PlantType, Role, Task, TimeFrame, UserStatus, WorkOrderStatus } from "./enums";

export class Equipment
{
    id: number; 
        
    //Foreign keys
    workOrderId: number;
    equipmentId: number;
    locationId: number;

    Name: string;
    model: string; 
    manifacturer: string;
    task: Task;
    lastCheck: Date;
}



export class Location
{
    id: number;
    //Foreign keys
    plantId: number;

    name: string;
    address: string; 
    postCode: string;
    coOrdinates: string;
    preciseLocation: string;
}

export class Message
{
    ok: boolean; 
    name: string; 
    detail: string;
    errorCode: string; 
    //DataResult DataResult 
}

export class Plant
{
    id: number; 
    //Foreign keys
    workOrderId: number;
    equipmentId: number;
    locationId: number; 


    name: string; 
    plantType: PlantType;
}

export class SubWorkOrder
{
    id: string; 
    //Foreign keys
    workOrderId: number;
    userId: number;
    equipmentId: number;
    locationId: number; 


    name: string; 
    status: WorkOrderStatus;
    duration: string
    description: string; 
    comment: string;
    measurement: number; 
    measurementType: MeasurementType;
    delay: boolean;
}

export class User
{
    id: number;

    name: string;
    role: Role;
    status: UserStatus;
}

export class WorkOrder
{
    id: number; 
    //Foreign keys
    plantId: number;
    userId: number; 
    locationId: number; 

    name: string; 
    status: WorkOrderStatus; 
    timeFrame: TimeFrame;
    duration: string; 
    completeBy: Date; 
    emergencyJob: boolean;
    hasComments: boolean;
    lastCheck: Date; 
}


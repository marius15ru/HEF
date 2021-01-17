import { Pipe, PipeTransform } from '@angular/core';
import { MeasurementType, PlantType, Role, SubJobTask, UserStatus, JobStatus, Recurring } from './enums';

export class Area {
    id: number;
    name: string;
}

export class Comment {
    id: number;
    userId: number;
    jobId: number;
    text: string;
    seen: boolean;
    user: User;
}

export class Equipment {
    id: number;
    // Foreign keys
    stationId: number;

    name: string;
    model: Date;
    manufacturer: string;
    operation: string;
    lastCheck: Date;
}

export class Job {
    id: number;
    // Foreign keys
    stationId: number;
    station: Station;

    modifiedOn: Date;

    completeBy: Date;
    description: string;
    duration: string;
    emergencyJob: boolean;
    hasComments: boolean;
    lastCheck: Date;
    name: string;
    recurring: Recurring;
    status: JobStatus;
}
export class JobAssignments {
    id: number;
    jobId: number;
    userId: number;
}

export class Plant {
    id: number;
    // Foreign keys

    name: string;
}

export class Station {
    id: number;
    // Foreign keys
    plantId: number;
    areaId: number;

    plant: Plant;
    area: Area;

    address: string;
    description: string;
    name: string;
    locationPrecise: string;
    coOrdinates: string;
}

export class Message {
    ok: boolean;
    name: string;
    detail: string;
    errorCode: string;
    // DataResult DataResult
}


export class SubJobs {
    id: number;
    // Foreign keys
    jobId: number;
    equipmentId: number;

    status: JobStatus;
    description: string;
    value: number;
    unit: MeasurementType;
    subJobTask: SubJobTask;
}

export class User {
    id: number;

    name: string;
    role: Role;
    status: UserStatus;
    email: string;
    password: string;
}

@Pipe({name: 'enumToArray'})
export class EnumToArrayPipe implements PipeTransform {
  transform(value): Object {
    return Object.keys(value).filter(e => !isNaN(+e)).map(o => ({index: +o, name: value[o]}));
  }
}


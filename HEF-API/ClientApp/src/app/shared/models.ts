import { MeasurementType, PlantType, Recuring, Role, Task, UserStatus, JobStatus } from './enums';

export class Area {
    id: number;
    name: string;
}

export class Comment {
    id: number;
    userId: number;
    jobId: number;
    text: string;
}

export class Equipment {
    id: number;
    // Foreign keys
    stationId: number;

    name: string;
    model: string;
    manufacturer: string;
    operation: string;
}

export class Job {
    id: number;
    // Foreign keys
    stationId: number;

    completedBy: Date;
    description: string;
    duration: Date;
    emergencyJob: boolean;
    hasComments: boolean;
    lastCheck: Date;
    name: string;
    recuring: Recuring;
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
    id: string;
    // Foreign keys
    jobId: number;
    equipmentId: number;
    name: string;
    status: JobStatus;
    description: string;
    value: number;
    unit: MeasurementType;
}

export class User {
    id: number;

    name: string;
    role: Role;
    status: UserStatus;
}


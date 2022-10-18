export interface VehicleEngine {
    engineType: string;
    engineSize: number;
    enginePower: number;
}

export type Vehicle = {
    type: string;
    id?: string;
    plate: string;
    mark: string;
    model: string;
    vin: string;
    year: number;
    clientId: string;
    createdAt?: number;
    updatedAt?: number;
    engine?: VehicleEngine;
};

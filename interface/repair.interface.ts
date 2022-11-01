export interface RepairCosts {
    countAll: number;
    priceBruttoAll: number | string;
    priceNettoAll: number | string;
    taxAll: number | string;
}

export interface RepairPart {
    name: string;
    priceBuyNetto: number | string;
    priceNetto: number | string;
    priceBrutto: number | string;
    tax: number | string;
    count: number;
}

export interface Repair {
    id?: string;
    status: string;
    type: string;
    mileage: number;
    vehicleId: string;
    partsList: RepairPart[];
    costs?: RepairCosts;
    createdAt?: number;
    updatedAt?: number;
}

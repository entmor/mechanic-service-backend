// package: Repair
// file: Repair/Repair.proto

import * as jspb from "google-protobuf";
import * as Schema_VehicleSchema_pb from "../Schema/VehicleSchema_pb";

export class RepairCostsSchema extends jspb.Message {
  getCountAll(): number;
  setCountAll(value: number): void;

  getPriceNettoAll(): number;
  setPriceNettoAll(value: number): void;

  getPriceBruttoAll(): number;
  setPriceBruttoAll(value: number): void;

  getTaxAll(): number;
  setTaxAll(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RepairCostsSchema.AsObject;
  static toObject(includeInstance: boolean, msg: RepairCostsSchema): RepairCostsSchema.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RepairCostsSchema, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RepairCostsSchema;
  static deserializeBinaryFromReader(message: RepairCostsSchema, reader: jspb.BinaryReader): RepairCostsSchema;
}

export namespace RepairCostsSchema {
  export type AsObject = {
    countAll: number,
    priceNettoAll: number,
    priceBruttoAll: number,
    taxAll: number,
  }
}

export class RepairPartSchema extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getPriceBuyNetto(): number;
  setPriceBuyNetto(value: number): void;

  getPriceNetto(): number;
  setPriceNetto(value: number): void;

  getPriceBrutto(): number;
  setPriceBrutto(value: number): void;

  getTax(): number;
  setTax(value: number): void;

  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RepairPartSchema.AsObject;
  static toObject(includeInstance: boolean, msg: RepairPartSchema): RepairPartSchema.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RepairPartSchema, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RepairPartSchema;
  static deserializeBinaryFromReader(message: RepairPartSchema, reader: jspb.BinaryReader): RepairPartSchema;
}

export namespace RepairPartSchema {
  export type AsObject = {
    name: string,
    priceBuyNetto: number,
    priceNetto: number,
    priceBrutto: number,
    tax: number,
    count: number,
  }
}

export class RepairSchema extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getType(): string;
  setType(value: string): void;

  getStatus(): string;
  setStatus(value: string): void;

  getMileage(): number;
  setMileage(value: number): void;

  getVehicleId(): string;
  setVehicleId(value: string): void;

  hasVehicle(): boolean;
  clearVehicle(): void;
  getVehicle(): Schema_VehicleSchema_pb.VehicleSchema | undefined;
  setVehicle(value?: Schema_VehicleSchema_pb.VehicleSchema): void;

  clearPartsList(): void;
  getPartsList(): Array<RepairPartSchema>;
  setPartsList(value: Array<RepairPartSchema>): void;
  addParts(value?: RepairPartSchema, index?: number): RepairPartSchema;

  hasCosts(): boolean;
  clearCosts(): void;
  getCosts(): RepairCostsSchema | undefined;
  setCosts(value?: RepairCostsSchema): void;

  getCreatedAt(): number;
  setCreatedAt(value: number): void;

  getUpdatedAt(): number;
  setUpdatedAt(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RepairSchema.AsObject;
  static toObject(includeInstance: boolean, msg: RepairSchema): RepairSchema.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RepairSchema, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RepairSchema;
  static deserializeBinaryFromReader(message: RepairSchema, reader: jspb.BinaryReader): RepairSchema;
}

export namespace RepairSchema {
  export type AsObject = {
    id: string,
    type: string,
    status: string,
    mileage: number,
    vehicleId: string,
    vehicle?: Schema_VehicleSchema_pb.VehicleSchema.AsObject,
    partsList: Array<RepairPartSchema.AsObject>,
    costs?: RepairCostsSchema.AsObject,
    createdAt: number,
    updatedAt: number,
  }
}

export class GetRepairRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRepairRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRepairRequest): GetRepairRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetRepairRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRepairRequest;
  static deserializeBinaryFromReader(message: GetRepairRequest, reader: jspb.BinaryReader): GetRepairRequest;
}

export namespace GetRepairRequest {
  export type AsObject = {
    id: string,
  }
}

export class GetRepairResponse extends jspb.Message {
  hasRepair(): boolean;
  clearRepair(): void;
  getRepair(): RepairSchema | undefined;
  setRepair(value?: RepairSchema): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRepairResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetRepairResponse): GetRepairResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetRepairResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRepairResponse;
  static deserializeBinaryFromReader(message: GetRepairResponse, reader: jspb.BinaryReader): GetRepairResponse;
}

export namespace GetRepairResponse {
  export type AsObject = {
    repair?: RepairSchema.AsObject,
  }
}

export class SetRepairRequest extends jspb.Message {
  hasRepair(): boolean;
  clearRepair(): void;
  getRepair(): RepairSchema | undefined;
  setRepair(value?: RepairSchema): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetRepairRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetRepairRequest): SetRepairRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetRepairRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetRepairRequest;
  static deserializeBinaryFromReader(message: SetRepairRequest, reader: jspb.BinaryReader): SetRepairRequest;
}

export namespace SetRepairRequest {
  export type AsObject = {
    repair?: RepairSchema.AsObject,
  }
}

export class SetRepairResponse extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetRepairResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetRepairResponse): SetRepairResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetRepairResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetRepairResponse;
  static deserializeBinaryFromReader(message: SetRepairResponse, reader: jspb.BinaryReader): SetRepairResponse;
}

export namespace SetRepairResponse {
  export type AsObject = {
    id: string,
  }
}

export class UpdateRepairRequest extends jspb.Message {
  hasRepair(): boolean;
  clearRepair(): void;
  getRepair(): RepairSchema | undefined;
  setRepair(value?: RepairSchema): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateRepairRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateRepairRequest): UpdateRepairRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateRepairRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateRepairRequest;
  static deserializeBinaryFromReader(message: UpdateRepairRequest, reader: jspb.BinaryReader): UpdateRepairRequest;
}

export namespace UpdateRepairRequest {
  export type AsObject = {
    repair?: RepairSchema.AsObject,
  }
}

export class UpdateRepairResponse extends jspb.Message {
  getUpdated(): boolean;
  setUpdated(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateRepairResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateRepairResponse): UpdateRepairResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateRepairResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateRepairResponse;
  static deserializeBinaryFromReader(message: UpdateRepairResponse, reader: jspb.BinaryReader): UpdateRepairResponse;
}

export namespace UpdateRepairResponse {
  export type AsObject = {
    updated: boolean,
  }
}

export class DeleteRepairRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteRepairRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteRepairRequest): DeleteRepairRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteRepairRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteRepairRequest;
  static deserializeBinaryFromReader(message: DeleteRepairRequest, reader: jspb.BinaryReader): DeleteRepairRequest;
}

export namespace DeleteRepairRequest {
  export type AsObject = {
    id: string,
  }
}

export class DeleteRepairResponse extends jspb.Message {
  getDeleted(): boolean;
  setDeleted(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteRepairResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteRepairResponse): DeleteRepairResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteRepairResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteRepairResponse;
  static deserializeBinaryFromReader(message: DeleteRepairResponse, reader: jspb.BinaryReader): DeleteRepairResponse;
}

export namespace DeleteRepairResponse {
  export type AsObject = {
    deleted: boolean,
  }
}

export class DeleteAllRepairsByVehicleIdRequest extends jspb.Message {
  getVehicleId(): string;
  setVehicleId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteAllRepairsByVehicleIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteAllRepairsByVehicleIdRequest): DeleteAllRepairsByVehicleIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteAllRepairsByVehicleIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteAllRepairsByVehicleIdRequest;
  static deserializeBinaryFromReader(message: DeleteAllRepairsByVehicleIdRequest, reader: jspb.BinaryReader): DeleteAllRepairsByVehicleIdRequest;
}

export namespace DeleteAllRepairsByVehicleIdRequest {
  export type AsObject = {
    vehicleId: string,
  }
}

export class DeleteAllRepairsByVehicleIdResponse extends jspb.Message {
  getDeleted(): boolean;
  setDeleted(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteAllRepairsByVehicleIdResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteAllRepairsByVehicleIdResponse): DeleteAllRepairsByVehicleIdResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteAllRepairsByVehicleIdResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteAllRepairsByVehicleIdResponse;
  static deserializeBinaryFromReader(message: DeleteAllRepairsByVehicleIdResponse, reader: jspb.BinaryReader): DeleteAllRepairsByVehicleIdResponse;
}

export namespace DeleteAllRepairsByVehicleIdResponse {
  export type AsObject = {
    deleted: boolean,
  }
}

export class GetAllRepairsRequest extends jspb.Message {
  getPage(): number;
  setPage(value: number): void;

  getPerPage(): number;
  setPerPage(value: number): void;

  getSort(): string;
  setSort(value: string): void;

  getOrderby(): string;
  setOrderby(value: string): void;

  hasWhere(): boolean;
  clearWhere(): void;
  getWhere(): string;
  setWhere(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllRepairsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllRepairsRequest): GetAllRepairsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAllRepairsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllRepairsRequest;
  static deserializeBinaryFromReader(message: GetAllRepairsRequest, reader: jspb.BinaryReader): GetAllRepairsRequest;
}

export namespace GetAllRepairsRequest {
  export type AsObject = {
    page: number,
    perPage: number,
    sort: string,
    orderby: string,
    where: string,
  }
}

export class GetAllRepairsResponse extends jspb.Message {
  getCount(): number;
  setCount(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  getPerPage(): number;
  setPerPage(value: number): void;

  getSort(): string;
  setSort(value: string): void;

  getIsNextPage(): boolean;
  setIsNextPage(value: boolean): void;

  clearRepairsList(): void;
  getRepairsList(): Array<RepairSchema>;
  setRepairsList(value: Array<RepairSchema>): void;
  addRepairs(value?: RepairSchema, index?: number): RepairSchema;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllRepairsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllRepairsResponse): GetAllRepairsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAllRepairsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllRepairsResponse;
  static deserializeBinaryFromReader(message: GetAllRepairsResponse, reader: jspb.BinaryReader): GetAllRepairsResponse;
}

export namespace GetAllRepairsResponse {
  export type AsObject = {
    count: number,
    page: number,
    perPage: number,
    sort: string,
    isNextPage: boolean,
    repairsList: Array<RepairSchema.AsObject>,
  }
}


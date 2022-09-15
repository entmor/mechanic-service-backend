// package: Vehicle
// file: Vehicle/Vehicle.proto

import * as jspb from "google-protobuf";

export class VehicleEngineSchema extends jspb.Message {
  getEngineSize(): number;
  setEngineSize(value: number): void;

  getEnginePower(): number;
  setEnginePower(value: number): void;

  getEngineType(): string;
  setEngineType(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VehicleEngineSchema.AsObject;
  static toObject(includeInstance: boolean, msg: VehicleEngineSchema): VehicleEngineSchema.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VehicleEngineSchema, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VehicleEngineSchema;
  static deserializeBinaryFromReader(message: VehicleEngineSchema, reader: jspb.BinaryReader): VehicleEngineSchema;
}

export namespace VehicleEngineSchema {
  export type AsObject = {
    engineSize: number,
    enginePower: number,
    engineType: string,
  }
}

export class VehicleSchema extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getPlate(): string;
  setPlate(value: string): void;

  getMark(): string;
  setMark(value: string): void;

  getModel(): string;
  setModel(value: string): void;

  getVin(): string;
  setVin(value: string): void;

  getYear(): number;
  setYear(value: number): void;

  getClientId(): string;
  setClientId(value: string): void;

  getCreatedAt(): number;
  setCreatedAt(value: number): void;

  getUpdatedAt(): number;
  setUpdatedAt(value: number): void;

  getType(): string;
  setType(value: string): void;

  hasEngine(): boolean;
  clearEngine(): void;
  getEngine(): VehicleEngineSchema | undefined;
  setEngine(value?: VehicleEngineSchema): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VehicleSchema.AsObject;
  static toObject(includeInstance: boolean, msg: VehicleSchema): VehicleSchema.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VehicleSchema, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VehicleSchema;
  static deserializeBinaryFromReader(message: VehicleSchema, reader: jspb.BinaryReader): VehicleSchema;
}

export namespace VehicleSchema {
  export type AsObject = {
    id: string,
    plate: string,
    mark: string,
    model: string,
    vin: string,
    year: number,
    clientId: string,
    createdAt: number,
    updatedAt: number,
    type: string,
    engine?: VehicleEngineSchema.AsObject,
  }
}

export class GetVehicleRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetVehicleRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetVehicleRequest): GetVehicleRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetVehicleRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetVehicleRequest;
  static deserializeBinaryFromReader(message: GetVehicleRequest, reader: jspb.BinaryReader): GetVehicleRequest;
}

export namespace GetVehicleRequest {
  export type AsObject = {
    id: string,
  }
}

export class GetVehicleResponse extends jspb.Message {
  hasVehicle(): boolean;
  clearVehicle(): void;
  getVehicle(): VehicleSchema | undefined;
  setVehicle(value?: VehicleSchema): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetVehicleResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetVehicleResponse): GetVehicleResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetVehicleResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetVehicleResponse;
  static deserializeBinaryFromReader(message: GetVehicleResponse, reader: jspb.BinaryReader): GetVehicleResponse;
}

export namespace GetVehicleResponse {
  export type AsObject = {
    vehicle?: VehicleSchema.AsObject,
  }
}

export class SetVehicleRequest extends jspb.Message {
  hasVehicle(): boolean;
  clearVehicle(): void;
  getVehicle(): VehicleSchema | undefined;
  setVehicle(value?: VehicleSchema): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetVehicleRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetVehicleRequest): SetVehicleRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetVehicleRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetVehicleRequest;
  static deserializeBinaryFromReader(message: SetVehicleRequest, reader: jspb.BinaryReader): SetVehicleRequest;
}

export namespace SetVehicleRequest {
  export type AsObject = {
    vehicle?: VehicleSchema.AsObject,
  }
}

export class SetVehicleResponse extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetVehicleResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetVehicleResponse): SetVehicleResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetVehicleResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetVehicleResponse;
  static deserializeBinaryFromReader(message: SetVehicleResponse, reader: jspb.BinaryReader): SetVehicleResponse;
}

export namespace SetVehicleResponse {
  export type AsObject = {
    id: string,
  }
}

export class UpdateVehicleRequest extends jspb.Message {
  hasVehicle(): boolean;
  clearVehicle(): void;
  getVehicle(): VehicleSchema | undefined;
  setVehicle(value?: VehicleSchema): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateVehicleRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateVehicleRequest): UpdateVehicleRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateVehicleRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateVehicleRequest;
  static deserializeBinaryFromReader(message: UpdateVehicleRequest, reader: jspb.BinaryReader): UpdateVehicleRequest;
}

export namespace UpdateVehicleRequest {
  export type AsObject = {
    vehicle?: VehicleSchema.AsObject,
  }
}

export class UpdateVehicleResponse extends jspb.Message {
  getUpdated(): boolean;
  setUpdated(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateVehicleResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateVehicleResponse): UpdateVehicleResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateVehicleResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateVehicleResponse;
  static deserializeBinaryFromReader(message: UpdateVehicleResponse, reader: jspb.BinaryReader): UpdateVehicleResponse;
}

export namespace UpdateVehicleResponse {
  export type AsObject = {
    updated: boolean,
  }
}

export class DeleteVehicleRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteVehicleRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteVehicleRequest): DeleteVehicleRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteVehicleRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteVehicleRequest;
  static deserializeBinaryFromReader(message: DeleteVehicleRequest, reader: jspb.BinaryReader): DeleteVehicleRequest;
}

export namespace DeleteVehicleRequest {
  export type AsObject = {
    id: string,
  }
}

export class DeleteVehicleResponse extends jspb.Message {
  getDeleted(): boolean;
  setDeleted(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteVehicleResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteVehicleResponse): DeleteVehicleResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteVehicleResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteVehicleResponse;
  static deserializeBinaryFromReader(message: DeleteVehicleResponse, reader: jspb.BinaryReader): DeleteVehicleResponse;
}

export namespace DeleteVehicleResponse {
  export type AsObject = {
    deleted: boolean,
  }
}

export class GetAllVehiclesRequest extends jspb.Message {
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
  toObject(includeInstance?: boolean): GetAllVehiclesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllVehiclesRequest): GetAllVehiclesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAllVehiclesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllVehiclesRequest;
  static deserializeBinaryFromReader(message: GetAllVehiclesRequest, reader: jspb.BinaryReader): GetAllVehiclesRequest;
}

export namespace GetAllVehiclesRequest {
  export type AsObject = {
    page: number,
    perPage: number,
    sort: string,
    orderby: string,
    where: string,
  }
}

export class GetAllVehiclesResponse extends jspb.Message {
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

  clearVehiclesList(): void;
  getVehiclesList(): Array<VehicleSchema>;
  setVehiclesList(value: Array<VehicleSchema>): void;
  addVehicles(value?: VehicleSchema, index?: number): VehicleSchema;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllVehiclesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllVehiclesResponse): GetAllVehiclesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAllVehiclesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllVehiclesResponse;
  static deserializeBinaryFromReader(message: GetAllVehiclesResponse, reader: jspb.BinaryReader): GetAllVehiclesResponse;
}

export namespace GetAllVehiclesResponse {
  export type AsObject = {
    count: number,
    page: number,
    perPage: number,
    sort: string,
    isNextPage: boolean,
    vehiclesList: Array<VehicleSchema.AsObject>,
  }
}


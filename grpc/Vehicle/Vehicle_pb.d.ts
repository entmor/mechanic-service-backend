// package: Vehicle
// file: Vehicle/Vehicle.proto

import * as jspb from "google-protobuf";
import * as Schema_VehicleSchema_pb from "../Schema/VehicleSchema_pb";

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
  getVehicle(): Schema_VehicleSchema_pb.VehicleSchema | undefined;
  setVehicle(value?: Schema_VehicleSchema_pb.VehicleSchema): void;

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
    vehicle?: Schema_VehicleSchema_pb.VehicleSchema.AsObject,
  }
}

export class SetVehicleRequest extends jspb.Message {
  hasVehicle(): boolean;
  clearVehicle(): void;
  getVehicle(): Schema_VehicleSchema_pb.VehicleSchema | undefined;
  setVehicle(value?: Schema_VehicleSchema_pb.VehicleSchema): void;

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
    vehicle?: Schema_VehicleSchema_pb.VehicleSchema.AsObject,
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
  getVehicle(): Schema_VehicleSchema_pb.VehicleSchema | undefined;
  setVehicle(value?: Schema_VehicleSchema_pb.VehicleSchema): void;

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
    vehicle?: Schema_VehicleSchema_pb.VehicleSchema.AsObject,
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

export class DeleteAllVehiclesByClientIdRequest extends jspb.Message {
  getClientId(): string;
  setClientId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteAllVehiclesByClientIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteAllVehiclesByClientIdRequest): DeleteAllVehiclesByClientIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteAllVehiclesByClientIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteAllVehiclesByClientIdRequest;
  static deserializeBinaryFromReader(message: DeleteAllVehiclesByClientIdRequest, reader: jspb.BinaryReader): DeleteAllVehiclesByClientIdRequest;
}

export namespace DeleteAllVehiclesByClientIdRequest {
  export type AsObject = {
    clientId: string,
  }
}

export class DeleteAllVehiclesByClientIdResponse extends jspb.Message {
  getDeleted(): boolean;
  setDeleted(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteAllVehiclesByClientIdResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteAllVehiclesByClientIdResponse): DeleteAllVehiclesByClientIdResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteAllVehiclesByClientIdResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteAllVehiclesByClientIdResponse;
  static deserializeBinaryFromReader(message: DeleteAllVehiclesByClientIdResponse, reader: jspb.BinaryReader): DeleteAllVehiclesByClientIdResponse;
}

export namespace DeleteAllVehiclesByClientIdResponse {
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
  getVehiclesList(): Array<Schema_VehicleSchema_pb.VehicleSchema>;
  setVehiclesList(value: Array<Schema_VehicleSchema_pb.VehicleSchema>): void;
  addVehicles(value?: Schema_VehicleSchema_pb.VehicleSchema, index?: number): Schema_VehicleSchema_pb.VehicleSchema;

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
    vehiclesList: Array<Schema_VehicleSchema_pb.VehicleSchema.AsObject>,
  }
}


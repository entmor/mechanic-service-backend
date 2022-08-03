// package: Car
// file: Car/Car.proto

import * as jspb from "google-protobuf";

export class CarSchema extends jspb.Message {
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

  getYear(): string;
  setYear(value: string): void;

  getClientId(): string;
  setClientId(value: string): void;

  getCreatedAt(): number;
  setCreatedAt(value: number): void;

  getUpdatedAt(): number;
  setUpdatedAt(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CarSchema.AsObject;
  static toObject(includeInstance: boolean, msg: CarSchema): CarSchema.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CarSchema, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CarSchema;
  static deserializeBinaryFromReader(message: CarSchema, reader: jspb.BinaryReader): CarSchema;
}

export namespace CarSchema {
  export type AsObject = {
    id: string,
    plate: string,
    mark: string,
    model: string,
    vin: string,
    year: string,
    clientId: string,
    createdAt: number,
    updatedAt: number,
  }
}

export class GetCarRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCarRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCarRequest): GetCarRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCarRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCarRequest;
  static deserializeBinaryFromReader(message: GetCarRequest, reader: jspb.BinaryReader): GetCarRequest;
}

export namespace GetCarRequest {
  export type AsObject = {
    id: number,
  }
}

export class GetCarResponse extends jspb.Message {
  hasCar(): boolean;
  clearCar(): void;
  getCar(): CarSchema | undefined;
  setCar(value?: CarSchema): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCarResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetCarResponse): GetCarResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCarResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCarResponse;
  static deserializeBinaryFromReader(message: GetCarResponse, reader: jspb.BinaryReader): GetCarResponse;
}

export namespace GetCarResponse {
  export type AsObject = {
    car?: CarSchema.AsObject,
  }
}

export class SetCarRequest extends jspb.Message {
  hasCar(): boolean;
  clearCar(): void;
  getCar(): CarSchema | undefined;
  setCar(value?: CarSchema): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetCarRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetCarRequest): SetCarRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetCarRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetCarRequest;
  static deserializeBinaryFromReader(message: SetCarRequest, reader: jspb.BinaryReader): SetCarRequest;
}

export namespace SetCarRequest {
  export type AsObject = {
    car?: CarSchema.AsObject,
  }
}

export class SetCarResponse extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetCarResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetCarResponse): SetCarResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetCarResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetCarResponse;
  static deserializeBinaryFromReader(message: SetCarResponse, reader: jspb.BinaryReader): SetCarResponse;
}

export namespace SetCarResponse {
  export type AsObject = {
    id: number,
  }
}

export class UpdateCarRequest extends jspb.Message {
  hasCar(): boolean;
  clearCar(): void;
  getCar(): CarSchema | undefined;
  setCar(value?: CarSchema): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateCarRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateCarRequest): UpdateCarRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateCarRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateCarRequest;
  static deserializeBinaryFromReader(message: UpdateCarRequest, reader: jspb.BinaryReader): UpdateCarRequest;
}

export namespace UpdateCarRequest {
  export type AsObject = {
    car?: CarSchema.AsObject,
  }
}

export class UpdateCarResponse extends jspb.Message {
  getUpdated(): boolean;
  setUpdated(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateCarResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateCarResponse): UpdateCarResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateCarResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateCarResponse;
  static deserializeBinaryFromReader(message: UpdateCarResponse, reader: jspb.BinaryReader): UpdateCarResponse;
}

export namespace UpdateCarResponse {
  export type AsObject = {
    updated: boolean,
  }
}

export class DeleteCarRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteCarRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteCarRequest): DeleteCarRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteCarRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteCarRequest;
  static deserializeBinaryFromReader(message: DeleteCarRequest, reader: jspb.BinaryReader): DeleteCarRequest;
}

export namespace DeleteCarRequest {
  export type AsObject = {
    id: number,
  }
}

export class DeleteCarResponse extends jspb.Message {
  getDeleted(): boolean;
  setDeleted(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteCarResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteCarResponse): DeleteCarResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteCarResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteCarResponse;
  static deserializeBinaryFromReader(message: DeleteCarResponse, reader: jspb.BinaryReader): DeleteCarResponse;
}

export namespace DeleteCarResponse {
  export type AsObject = {
    deleted: boolean,
  }
}

export class GetAllCarsRequest extends jspb.Message {
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
  toObject(includeInstance?: boolean): GetAllCarsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllCarsRequest): GetAllCarsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAllCarsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllCarsRequest;
  static deserializeBinaryFromReader(message: GetAllCarsRequest, reader: jspb.BinaryReader): GetAllCarsRequest;
}

export namespace GetAllCarsRequest {
  export type AsObject = {
    page: number,
    perPage: number,
    sort: string,
    orderby: string,
    where: string,
  }
}

export class GetAllCarsResponse extends jspb.Message {
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

  clearCarsList(): void;
  getCarsList(): Array<CarSchema>;
  setCarsList(value: Array<CarSchema>): void;
  addCars(value?: CarSchema, index?: number): CarSchema;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllCarsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllCarsResponse): GetAllCarsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAllCarsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllCarsResponse;
  static deserializeBinaryFromReader(message: GetAllCarsResponse, reader: jspb.BinaryReader): GetAllCarsResponse;
}

export namespace GetAllCarsResponse {
  export type AsObject = {
    count: number,
    page: number,
    perPage: number,
    sort: string,
    isNextPage: boolean,
    carsList: Array<CarSchema.AsObject>,
  }
}


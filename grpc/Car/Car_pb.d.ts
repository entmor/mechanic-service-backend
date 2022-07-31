// package: Car
// file: Car/Car.proto

import * as jspb from "google-protobuf";

export class CarSchema extends jspb.Message {
  getId(): number;
  setId(value: number): void;

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

  getClientId(): number;
  setClientId(value: number): void;

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
    id: number,
    plate: string,
    mark: string,
    model: string,
    vin: string,
    year: string,
    clientId: number,
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
  hasCar(): boolean;
  clearCar(): void;
  getCar(): CarSchema | undefined;
  setCar(value?: CarSchema): void;

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
    car?: CarSchema.AsObject,
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
  hasCar(): boolean;
  clearCar(): void;
  getCar(): CarSchema | undefined;
  setCar(value?: CarSchema): void;

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
    car?: CarSchema.AsObject,
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


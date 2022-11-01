// package: Schema
// file: Schema/VehicleEngineSchema.proto

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


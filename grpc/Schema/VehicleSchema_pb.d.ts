// package: Schema
// file: Schema/VehicleSchema.proto

import * as jspb from "google-protobuf";
import * as Schema_VehicleEngineSchema_pb from "../Schema/VehicleEngineSchema_pb";

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
  getEngine(): Schema_VehicleEngineSchema_pb.VehicleEngineSchema | undefined;
  setEngine(value?: Schema_VehicleEngineSchema_pb.VehicleEngineSchema): void;

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
    engine?: Schema_VehicleEngineSchema_pb.VehicleEngineSchema.AsObject,
  }
}


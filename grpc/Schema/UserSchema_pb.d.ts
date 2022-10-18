// package: Schema
// file: Schema/UserSchema.proto

import * as jspb from "google-protobuf";

export class UserSchema extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getFirstname(): string;
  setFirstname(value: string): void;

  getLastname(): string;
  setLastname(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  getRole(): string;
  setRole(value: string): void;

  getStatus(): string;
  setStatus(value: string): void;

  getCreatedAt(): number;
  setCreatedAt(value: number): void;

  getUpdatedAt(): number;
  setUpdatedAt(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserSchema.AsObject;
  static toObject(includeInstance: boolean, msg: UserSchema): UserSchema.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserSchema, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserSchema;
  static deserializeBinaryFromReader(message: UserSchema, reader: jspb.BinaryReader): UserSchema;
}

export namespace UserSchema {
  export type AsObject = {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role: string,
    status: string,
    createdAt: number,
    updatedAt: number,
  }
}


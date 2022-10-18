// package: Schema
// file: Schema/AuthSchema.proto

import * as jspb from "google-protobuf";

export class AuthUser extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getType(): string;
  setType(value: string): void;

  getRole(): string;
  setRole(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthUser.AsObject;
  static toObject(includeInstance: boolean, msg: AuthUser): AuthUser.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AuthUser, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthUser;
  static deserializeBinaryFromReader(message: AuthUser, reader: jspb.BinaryReader): AuthUser;
}

export namespace AuthUser {
  export type AsObject = {
    id: string,
    type: string,
    role: string,
  }
}


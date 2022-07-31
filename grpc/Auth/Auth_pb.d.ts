// package: Auth
// file: Auth/Auth.proto

import * as jspb from "google-protobuf";
import * as Schema_UserSchema_pb from "../Schema/UserSchema_pb";

export class GetAuthRequest extends jspb.Message {
  getToken(): string;
  setToken(value: string): void;

  getType(): string;
  setType(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAuthRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAuthRequest): GetAuthRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAuthRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAuthRequest;
  static deserializeBinaryFromReader(message: GetAuthRequest, reader: jspb.BinaryReader): GetAuthRequest;
}

export namespace GetAuthRequest {
  export type AsObject = {
    token: string,
    type: string,
  }
}

export class GetAuthResponse extends jspb.Message {
  getToken(): string;
  setToken(value: string): void;

  hasUser(): boolean;
  clearUser(): void;
  getUser(): Schema_UserSchema_pb.UserSchema | undefined;
  setUser(value?: Schema_UserSchema_pb.UserSchema): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAuthResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAuthResponse): GetAuthResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAuthResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAuthResponse;
  static deserializeBinaryFromReader(message: GetAuthResponse, reader: jspb.BinaryReader): GetAuthResponse;
}

export namespace GetAuthResponse {
  export type AsObject = {
    token: string,
    user?: Schema_UserSchema_pb.UserSchema.AsObject,
  }
}

export class SetAuthRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  getType(): string;
  setType(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetAuthRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetAuthRequest): SetAuthRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetAuthRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetAuthRequest;
  static deserializeBinaryFromReader(message: SetAuthRequest, reader: jspb.BinaryReader): SetAuthRequest;
}

export namespace SetAuthRequest {
  export type AsObject = {
    email: string,
    password: string,
    type: string,
  }
}

export class SetAuthResponse extends jspb.Message {
  getToken(): string;
  setToken(value: string): void;

  hasUser(): boolean;
  clearUser(): void;
  getUser(): Schema_UserSchema_pb.UserSchema | undefined;
  setUser(value?: Schema_UserSchema_pb.UserSchema): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetAuthResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetAuthResponse): SetAuthResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetAuthResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetAuthResponse;
  static deserializeBinaryFromReader(message: SetAuthResponse, reader: jspb.BinaryReader): SetAuthResponse;
}

export namespace SetAuthResponse {
  export type AsObject = {
    token: string,
    user?: Schema_UserSchema_pb.UserSchema.AsObject,
  }
}


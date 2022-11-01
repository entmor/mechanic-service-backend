// package: User
// file: User/User.proto

import * as jspb from "google-protobuf";
import * as Schema_UserSchema_pb from "../Schema/UserSchema_pb";
import * as Schema_AuthSchema_pb from "../Schema/AuthSchema_pb";

export class GetUserRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserRequest): GetUserRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserRequest;
  static deserializeBinaryFromReader(message: GetUserRequest, reader: jspb.BinaryReader): GetUserRequest;
}

export namespace GetUserRequest {
  export type AsObject = {
    id: string,
  }
}

export class GetUserResponse extends jspb.Message {
  hasUser(): boolean;
  clearUser(): void;
  getUser(): Schema_UserSchema_pb.UserSchema | undefined;
  setUser(value?: Schema_UserSchema_pb.UserSchema): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserResponse): GetUserResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserResponse;
  static deserializeBinaryFromReader(message: GetUserResponse, reader: jspb.BinaryReader): GetUserResponse;
}

export namespace GetUserResponse {
  export type AsObject = {
    user?: Schema_UserSchema_pb.UserSchema.AsObject,
  }
}

export class SetUserRequest extends jspb.Message {
  hasUser(): boolean;
  clearUser(): void;
  getUser(): Schema_UserSchema_pb.UserSchema | undefined;
  setUser(value?: Schema_UserSchema_pb.UserSchema): void;

  getSendEmail(): boolean;
  setSendEmail(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetUserRequest): SetUserRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetUserRequest;
  static deserializeBinaryFromReader(message: SetUserRequest, reader: jspb.BinaryReader): SetUserRequest;
}

export namespace SetUserRequest {
  export type AsObject = {
    user?: Schema_UserSchema_pb.UserSchema.AsObject,
    sendEmail: boolean,
  }
}

export class SetUserResponse extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetUserResponse): SetUserResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetUserResponse;
  static deserializeBinaryFromReader(message: SetUserResponse, reader: jspb.BinaryReader): SetUserResponse;
}

export namespace SetUserResponse {
  export type AsObject = {
    id: string,
  }
}

export class UpdateUserRequest extends jspb.Message {
  hasUser(): boolean;
  clearUser(): void;
  getUser(): Schema_UserSchema_pb.UserSchema | undefined;
  setUser(value?: Schema_UserSchema_pb.UserSchema): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateUserRequest): UpdateUserRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateUserRequest;
  static deserializeBinaryFromReader(message: UpdateUserRequest, reader: jspb.BinaryReader): UpdateUserRequest;
}

export namespace UpdateUserRequest {
  export type AsObject = {
    user?: Schema_UserSchema_pb.UserSchema.AsObject,
  }
}

export class UpdateUserResponse extends jspb.Message {
  getUpdated(): boolean;
  setUpdated(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateUserResponse): UpdateUserResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateUserResponse;
  static deserializeBinaryFromReader(message: UpdateUserResponse, reader: jspb.BinaryReader): UpdateUserResponse;
}

export namespace UpdateUserResponse {
  export type AsObject = {
    updated: boolean,
  }
}

export class DeleteUserRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteUserRequest): DeleteUserRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteUserRequest;
  static deserializeBinaryFromReader(message: DeleteUserRequest, reader: jspb.BinaryReader): DeleteUserRequest;
}

export namespace DeleteUserRequest {
  export type AsObject = {
    id: string,
  }
}

export class DeleteUserResponse extends jspb.Message {
  getDeleted(): boolean;
  setDeleted(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteUserResponse): DeleteUserResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteUserResponse;
  static deserializeBinaryFromReader(message: DeleteUserResponse, reader: jspb.BinaryReader): DeleteUserResponse;
}

export namespace DeleteUserResponse {
  export type AsObject = {
    deleted: boolean,
  }
}

export class GetAllUsersRequest extends jspb.Message {
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
  toObject(includeInstance?: boolean): GetAllUsersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllUsersRequest): GetAllUsersRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAllUsersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllUsersRequest;
  static deserializeBinaryFromReader(message: GetAllUsersRequest, reader: jspb.BinaryReader): GetAllUsersRequest;
}

export namespace GetAllUsersRequest {
  export type AsObject = {
    page: number,
    perPage: number,
    sort: string,
    orderby: string,
    where: string,
  }
}

export class GetAllUsersResponse extends jspb.Message {
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

  clearUsersList(): void;
  getUsersList(): Array<Schema_UserSchema_pb.UserSchema>;
  setUsersList(value: Array<Schema_UserSchema_pb.UserSchema>): void;
  addUsers(value?: Schema_UserSchema_pb.UserSchema, index?: number): Schema_UserSchema_pb.UserSchema;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllUsersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllUsersResponse): GetAllUsersResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAllUsersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllUsersResponse;
  static deserializeBinaryFromReader(message: GetAllUsersResponse, reader: jspb.BinaryReader): GetAllUsersResponse;
}

export namespace GetAllUsersResponse {
  export type AsObject = {
    count: number,
    page: number,
    perPage: number,
    sort: string,
    isNextPage: boolean,
    usersList: Array<Schema_UserSchema_pb.UserSchema.AsObject>,
  }
}

export class GetUserAuthRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserAuthRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserAuthRequest): GetUserAuthRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetUserAuthRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserAuthRequest;
  static deserializeBinaryFromReader(message: GetUserAuthRequest, reader: jspb.BinaryReader): GetUserAuthRequest;
}

export namespace GetUserAuthRequest {
  export type AsObject = {
    email: string,
  }
}

export class GetUserAuthResponse extends jspb.Message {
  hasUser(): boolean;
  clearUser(): void;
  getUser(): Schema_UserSchema_pb.UserSchema | undefined;
  setUser(value?: Schema_UserSchema_pb.UserSchema): void;

  getSalt(): string;
  setSalt(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserAuthResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserAuthResponse): GetUserAuthResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetUserAuthResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserAuthResponse;
  static deserializeBinaryFromReader(message: GetUserAuthResponse, reader: jspb.BinaryReader): GetUserAuthResponse;
}

export namespace GetUserAuthResponse {
  export type AsObject = {
    user?: Schema_UserSchema_pb.UserSchema.AsObject,
    salt: string,
  }
}


// package: Client
// file: Client/Client.proto

import * as jspb from "google-protobuf";

export class ClientSchema extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getType(): string;
  setType(value: string): void;

  hasTaxNumber(): boolean;
  clearTaxNumber(): void;
  getTaxNumber(): number;
  setTaxNumber(value: number): void;

  getPhone(): string;
  setPhone(value: string): void;

  hasEmail(): boolean;
  clearEmail(): void;
  getEmail(): string;
  setEmail(value: string): void;

  getGender(): string;
  setGender(value: string): void;

  getStreet(): string;
  setStreet(value: string): void;

  getCity(): string;
  setCity(value: string): void;

  getZipCode(): string;
  setZipCode(value: string): void;

  getCreatedAt(): number;
  setCreatedAt(value: number): void;

  getUpdatedAt(): number;
  setUpdatedAt(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientSchema.AsObject;
  static toObject(includeInstance: boolean, msg: ClientSchema): ClientSchema.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientSchema, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientSchema;
  static deserializeBinaryFromReader(message: ClientSchema, reader: jspb.BinaryReader): ClientSchema;
}

export namespace ClientSchema {
  export type AsObject = {
    id: string,
    name: string,
    type: string,
    taxNumber: number,
    phone: string,
    email: string,
    gender: string,
    street: string,
    city: string,
    zipCode: string,
    createdAt: number,
    updatedAt: number,
  }
}

export class GetClientRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetClientRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetClientRequest): GetClientRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetClientRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetClientRequest;
  static deserializeBinaryFromReader(message: GetClientRequest, reader: jspb.BinaryReader): GetClientRequest;
}

export namespace GetClientRequest {
  export type AsObject = {
    id: string,
  }
}

export class GetClientResponse extends jspb.Message {
  hasClient(): boolean;
  clearClient(): void;
  getClient(): ClientSchema | undefined;
  setClient(value?: ClientSchema): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetClientResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetClientResponse): GetClientResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetClientResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetClientResponse;
  static deserializeBinaryFromReader(message: GetClientResponse, reader: jspb.BinaryReader): GetClientResponse;
}

export namespace GetClientResponse {
  export type AsObject = {
    client?: ClientSchema.AsObject,
  }
}

export class SetClientRequest extends jspb.Message {
  hasClient(): boolean;
  clearClient(): void;
  getClient(): ClientSchema | undefined;
  setClient(value?: ClientSchema): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetClientRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetClientRequest): SetClientRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetClientRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetClientRequest;
  static deserializeBinaryFromReader(message: SetClientRequest, reader: jspb.BinaryReader): SetClientRequest;
}

export namespace SetClientRequest {
  export type AsObject = {
    client?: ClientSchema.AsObject,
  }
}

export class SetClientResponse extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetClientResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetClientResponse): SetClientResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetClientResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetClientResponse;
  static deserializeBinaryFromReader(message: SetClientResponse, reader: jspb.BinaryReader): SetClientResponse;
}

export namespace SetClientResponse {
  export type AsObject = {
    id: string,
  }
}

export class UpdateClientRequest extends jspb.Message {
  hasClient(): boolean;
  clearClient(): void;
  getClient(): ClientSchema | undefined;
  setClient(value?: ClientSchema): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateClientRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateClientRequest): UpdateClientRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateClientRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateClientRequest;
  static deserializeBinaryFromReader(message: UpdateClientRequest, reader: jspb.BinaryReader): UpdateClientRequest;
}

export namespace UpdateClientRequest {
  export type AsObject = {
    client?: ClientSchema.AsObject,
  }
}

export class UpdateClientResponse extends jspb.Message {
  getUpdated(): boolean;
  setUpdated(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateClientResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateClientResponse): UpdateClientResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateClientResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateClientResponse;
  static deserializeBinaryFromReader(message: UpdateClientResponse, reader: jspb.BinaryReader): UpdateClientResponse;
}

export namespace UpdateClientResponse {
  export type AsObject = {
    updated: boolean,
  }
}

export class DeleteClientRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteClientRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteClientRequest): DeleteClientRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteClientRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteClientRequest;
  static deserializeBinaryFromReader(message: DeleteClientRequest, reader: jspb.BinaryReader): DeleteClientRequest;
}

export namespace DeleteClientRequest {
  export type AsObject = {
    id: string,
  }
}

export class DeleteClientResponse extends jspb.Message {
  getDeleted(): boolean;
  setDeleted(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteClientResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteClientResponse): DeleteClientResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteClientResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteClientResponse;
  static deserializeBinaryFromReader(message: DeleteClientResponse, reader: jspb.BinaryReader): DeleteClientResponse;
}

export namespace DeleteClientResponse {
  export type AsObject = {
    deleted: boolean,
  }
}

export class GetAllClientsRequest extends jspb.Message {
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
  toObject(includeInstance?: boolean): GetAllClientsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllClientsRequest): GetAllClientsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAllClientsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllClientsRequest;
  static deserializeBinaryFromReader(message: GetAllClientsRequest, reader: jspb.BinaryReader): GetAllClientsRequest;
}

export namespace GetAllClientsRequest {
  export type AsObject = {
    page: number,
    perPage: number,
    sort: string,
    orderby: string,
    where: string,
  }
}

export class GetAllClientsResponse extends jspb.Message {
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

  clearClientsList(): void;
  getClientsList(): Array<ClientSchema>;
  setClientsList(value: Array<ClientSchema>): void;
  addClients(value?: ClientSchema, index?: number): ClientSchema;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllClientsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllClientsResponse): GetAllClientsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAllClientsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllClientsResponse;
  static deserializeBinaryFromReader(message: GetAllClientsResponse, reader: jspb.BinaryReader): GetAllClientsResponse;
}

export namespace GetAllClientsResponse {
  export type AsObject = {
    count: number,
    page: number,
    perPage: number,
    sort: string,
    isNextPage: boolean,
    clientsList: Array<ClientSchema.AsObject>,
  }
}


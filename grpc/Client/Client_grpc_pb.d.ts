// GENERATED CODE -- DO NOT EDIT!

// package: Client
// file: Client/Client.proto

import * as Client_Client_pb from "../Client/Client_pb";
import * as grpc from "@grpc/grpc-js";

interface IClientService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getClient: grpc.MethodDefinition<Client_Client_pb.GetClientRequest, Client_Client_pb.GetClientResponse>;
  setClient: grpc.MethodDefinition<Client_Client_pb.SetClientRequest, Client_Client_pb.SetClientResponse>;
  updateClient: grpc.MethodDefinition<Client_Client_pb.UpdateClientRequest, Client_Client_pb.UpdateClientResponse>;
  deleteClient: grpc.MethodDefinition<Client_Client_pb.DeleteClientRequest, Client_Client_pb.DeleteClientResponse>;
  getAllClients: grpc.MethodDefinition<Client_Client_pb.GetAllClientsRequest, Client_Client_pb.GetAllClientsResponse>;
}

export const ClientService: IClientService;

export interface IClientServer extends grpc.UntypedServiceImplementation {
  getClient: grpc.handleUnaryCall<Client_Client_pb.GetClientRequest, Client_Client_pb.GetClientResponse>;
  setClient: grpc.handleUnaryCall<Client_Client_pb.SetClientRequest, Client_Client_pb.SetClientResponse>;
  updateClient: grpc.handleUnaryCall<Client_Client_pb.UpdateClientRequest, Client_Client_pb.UpdateClientResponse>;
  deleteClient: grpc.handleUnaryCall<Client_Client_pb.DeleteClientRequest, Client_Client_pb.DeleteClientResponse>;
  getAllClients: grpc.handleUnaryCall<Client_Client_pb.GetAllClientsRequest, Client_Client_pb.GetAllClientsResponse>;
}

export class ClientClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getClient(argument: Client_Client_pb.GetClientRequest, callback: grpc.requestCallback<Client_Client_pb.GetClientResponse>): grpc.ClientUnaryCall;
  getClient(argument: Client_Client_pb.GetClientRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Client_Client_pb.GetClientResponse>): grpc.ClientUnaryCall;
  getClient(argument: Client_Client_pb.GetClientRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Client_Client_pb.GetClientResponse>): grpc.ClientUnaryCall;
  setClient(argument: Client_Client_pb.SetClientRequest, callback: grpc.requestCallback<Client_Client_pb.SetClientResponse>): grpc.ClientUnaryCall;
  setClient(argument: Client_Client_pb.SetClientRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Client_Client_pb.SetClientResponse>): grpc.ClientUnaryCall;
  setClient(argument: Client_Client_pb.SetClientRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Client_Client_pb.SetClientResponse>): grpc.ClientUnaryCall;
  updateClient(argument: Client_Client_pb.UpdateClientRequest, callback: grpc.requestCallback<Client_Client_pb.UpdateClientResponse>): grpc.ClientUnaryCall;
  updateClient(argument: Client_Client_pb.UpdateClientRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Client_Client_pb.UpdateClientResponse>): grpc.ClientUnaryCall;
  updateClient(argument: Client_Client_pb.UpdateClientRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Client_Client_pb.UpdateClientResponse>): grpc.ClientUnaryCall;
  deleteClient(argument: Client_Client_pb.DeleteClientRequest, callback: grpc.requestCallback<Client_Client_pb.DeleteClientResponse>): grpc.ClientUnaryCall;
  deleteClient(argument: Client_Client_pb.DeleteClientRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Client_Client_pb.DeleteClientResponse>): grpc.ClientUnaryCall;
  deleteClient(argument: Client_Client_pb.DeleteClientRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Client_Client_pb.DeleteClientResponse>): grpc.ClientUnaryCall;
  getAllClients(argument: Client_Client_pb.GetAllClientsRequest, callback: grpc.requestCallback<Client_Client_pb.GetAllClientsResponse>): grpc.ClientUnaryCall;
  getAllClients(argument: Client_Client_pb.GetAllClientsRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Client_Client_pb.GetAllClientsResponse>): grpc.ClientUnaryCall;
  getAllClients(argument: Client_Client_pb.GetAllClientsRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Client_Client_pb.GetAllClientsResponse>): grpc.ClientUnaryCall;
}

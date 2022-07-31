// GENERATED CODE -- DO NOT EDIT!

// package: Auth
// file: Auth/Auth.proto

import * as Auth_Auth_pb from "../Auth/Auth_pb";
import * as grpc from "@grpc/grpc-js";

interface IAuthService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getAuth: grpc.MethodDefinition<Auth_Auth_pb.GetAuthRequest, Auth_Auth_pb.GetAuthResponse>;
  setAuth: grpc.MethodDefinition<Auth_Auth_pb.SetAuthRequest, Auth_Auth_pb.SetAuthResponse>;
}

export const AuthService: IAuthService;

export interface IAuthServer extends grpc.UntypedServiceImplementation {
  getAuth: grpc.handleUnaryCall<Auth_Auth_pb.GetAuthRequest, Auth_Auth_pb.GetAuthResponse>;
  setAuth: grpc.handleUnaryCall<Auth_Auth_pb.SetAuthRequest, Auth_Auth_pb.SetAuthResponse>;
}

export class AuthClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getAuth(argument: Auth_Auth_pb.GetAuthRequest, callback: grpc.requestCallback<Auth_Auth_pb.GetAuthResponse>): grpc.ClientUnaryCall;
  getAuth(argument: Auth_Auth_pb.GetAuthRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Auth_Auth_pb.GetAuthResponse>): grpc.ClientUnaryCall;
  getAuth(argument: Auth_Auth_pb.GetAuthRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Auth_Auth_pb.GetAuthResponse>): grpc.ClientUnaryCall;
  setAuth(argument: Auth_Auth_pb.SetAuthRequest, callback: grpc.requestCallback<Auth_Auth_pb.SetAuthResponse>): grpc.ClientUnaryCall;
  setAuth(argument: Auth_Auth_pb.SetAuthRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Auth_Auth_pb.SetAuthResponse>): grpc.ClientUnaryCall;
  setAuth(argument: Auth_Auth_pb.SetAuthRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Auth_Auth_pb.SetAuthResponse>): grpc.ClientUnaryCall;
}

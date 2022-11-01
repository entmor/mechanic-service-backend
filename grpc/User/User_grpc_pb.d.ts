// GENERATED CODE -- DO NOT EDIT!

// package: User
// file: User/User.proto

import * as User_User_pb from "../User/User_pb";
import * as grpc from "@grpc/grpc-js";

interface IUserService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getUser: grpc.MethodDefinition<User_User_pb.GetUserRequest, User_User_pb.GetUserResponse>;
  setUser: grpc.MethodDefinition<User_User_pb.SetUserRequest, User_User_pb.SetUserResponse>;
  updateUser: grpc.MethodDefinition<User_User_pb.UpdateUserRequest, User_User_pb.UpdateUserResponse>;
  deleteUser: grpc.MethodDefinition<User_User_pb.DeleteUserRequest, User_User_pb.DeleteUserResponse>;
  getAllUsers: grpc.MethodDefinition<User_User_pb.GetAllUsersRequest, User_User_pb.GetAllUsersResponse>;
  getUserAuth: grpc.MethodDefinition<User_User_pb.GetUserAuthRequest, User_User_pb.GetUserAuthResponse>;
}

export const UserService: IUserService;

export interface IUserServer extends grpc.UntypedServiceImplementation {
  getUser: grpc.handleUnaryCall<User_User_pb.GetUserRequest, User_User_pb.GetUserResponse>;
  setUser: grpc.handleUnaryCall<User_User_pb.SetUserRequest, User_User_pb.SetUserResponse>;
  updateUser: grpc.handleUnaryCall<User_User_pb.UpdateUserRequest, User_User_pb.UpdateUserResponse>;
  deleteUser: grpc.handleUnaryCall<User_User_pb.DeleteUserRequest, User_User_pb.DeleteUserResponse>;
  getAllUsers: grpc.handleUnaryCall<User_User_pb.GetAllUsersRequest, User_User_pb.GetAllUsersResponse>;
  getUserAuth: grpc.handleUnaryCall<User_User_pb.GetUserAuthRequest, User_User_pb.GetUserAuthResponse>;
}

export class UserClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getUser(argument: User_User_pb.GetUserRequest, callback: grpc.requestCallback<User_User_pb.GetUserResponse>): grpc.ClientUnaryCall;
  getUser(argument: User_User_pb.GetUserRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<User_User_pb.GetUserResponse>): grpc.ClientUnaryCall;
  getUser(argument: User_User_pb.GetUserRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<User_User_pb.GetUserResponse>): grpc.ClientUnaryCall;
  setUser(argument: User_User_pb.SetUserRequest, callback: grpc.requestCallback<User_User_pb.SetUserResponse>): grpc.ClientUnaryCall;
  setUser(argument: User_User_pb.SetUserRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<User_User_pb.SetUserResponse>): grpc.ClientUnaryCall;
  setUser(argument: User_User_pb.SetUserRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<User_User_pb.SetUserResponse>): grpc.ClientUnaryCall;
  updateUser(argument: User_User_pb.UpdateUserRequest, callback: grpc.requestCallback<User_User_pb.UpdateUserResponse>): grpc.ClientUnaryCall;
  updateUser(argument: User_User_pb.UpdateUserRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<User_User_pb.UpdateUserResponse>): grpc.ClientUnaryCall;
  updateUser(argument: User_User_pb.UpdateUserRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<User_User_pb.UpdateUserResponse>): grpc.ClientUnaryCall;
  deleteUser(argument: User_User_pb.DeleteUserRequest, callback: grpc.requestCallback<User_User_pb.DeleteUserResponse>): grpc.ClientUnaryCall;
  deleteUser(argument: User_User_pb.DeleteUserRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<User_User_pb.DeleteUserResponse>): grpc.ClientUnaryCall;
  deleteUser(argument: User_User_pb.DeleteUserRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<User_User_pb.DeleteUserResponse>): grpc.ClientUnaryCall;
  getAllUsers(argument: User_User_pb.GetAllUsersRequest, callback: grpc.requestCallback<User_User_pb.GetAllUsersResponse>): grpc.ClientUnaryCall;
  getAllUsers(argument: User_User_pb.GetAllUsersRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<User_User_pb.GetAllUsersResponse>): grpc.ClientUnaryCall;
  getAllUsers(argument: User_User_pb.GetAllUsersRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<User_User_pb.GetAllUsersResponse>): grpc.ClientUnaryCall;
  getUserAuth(argument: User_User_pb.GetUserAuthRequest, callback: grpc.requestCallback<User_User_pb.GetUserAuthResponse>): grpc.ClientUnaryCall;
  getUserAuth(argument: User_User_pb.GetUserAuthRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<User_User_pb.GetUserAuthResponse>): grpc.ClientUnaryCall;
  getUserAuth(argument: User_User_pb.GetUserAuthRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<User_User_pb.GetUserAuthResponse>): grpc.ClientUnaryCall;
}

// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var User_User_pb = require('../User/User_pb.js');
var Schema_UserSchema_pb = require('../Schema/UserSchema_pb.js');
var Schema_AuthSchema_pb = require('../Schema/AuthSchema_pb.js');

function serialize_User_DeleteUserRequest(arg) {
  if (!(arg instanceof User_User_pb.DeleteUserRequest)) {
    throw new Error('Expected argument of type User.DeleteUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User_DeleteUserRequest(buffer_arg) {
  return User_User_pb.DeleteUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_User_DeleteUserResponse(arg) {
  if (!(arg instanceof User_User_pb.DeleteUserResponse)) {
    throw new Error('Expected argument of type User.DeleteUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User_DeleteUserResponse(buffer_arg) {
  return User_User_pb.DeleteUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_User_GetAllUsersRequest(arg) {
  if (!(arg instanceof User_User_pb.GetAllUsersRequest)) {
    throw new Error('Expected argument of type User.GetAllUsersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User_GetAllUsersRequest(buffer_arg) {
  return User_User_pb.GetAllUsersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_User_GetAllUsersResponse(arg) {
  if (!(arg instanceof User_User_pb.GetAllUsersResponse)) {
    throw new Error('Expected argument of type User.GetAllUsersResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User_GetAllUsersResponse(buffer_arg) {
  return User_User_pb.GetAllUsersResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_User_GetUserAuthRequest(arg) {
  if (!(arg instanceof User_User_pb.GetUserAuthRequest)) {
    throw new Error('Expected argument of type User.GetUserAuthRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User_GetUserAuthRequest(buffer_arg) {
  return User_User_pb.GetUserAuthRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_User_GetUserAuthResponse(arg) {
  if (!(arg instanceof User_User_pb.GetUserAuthResponse)) {
    throw new Error('Expected argument of type User.GetUserAuthResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User_GetUserAuthResponse(buffer_arg) {
  return User_User_pb.GetUserAuthResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_User_GetUserRequest(arg) {
  if (!(arg instanceof User_User_pb.GetUserRequest)) {
    throw new Error('Expected argument of type User.GetUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User_GetUserRequest(buffer_arg) {
  return User_User_pb.GetUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_User_GetUserResponse(arg) {
  if (!(arg instanceof User_User_pb.GetUserResponse)) {
    throw new Error('Expected argument of type User.GetUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User_GetUserResponse(buffer_arg) {
  return User_User_pb.GetUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_User_SetUserRequest(arg) {
  if (!(arg instanceof User_User_pb.SetUserRequest)) {
    throw new Error('Expected argument of type User.SetUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User_SetUserRequest(buffer_arg) {
  return User_User_pb.SetUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_User_SetUserResponse(arg) {
  if (!(arg instanceof User_User_pb.SetUserResponse)) {
    throw new Error('Expected argument of type User.SetUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User_SetUserResponse(buffer_arg) {
  return User_User_pb.SetUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_User_UpdateUserRequest(arg) {
  if (!(arg instanceof User_User_pb.UpdateUserRequest)) {
    throw new Error('Expected argument of type User.UpdateUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User_UpdateUserRequest(buffer_arg) {
  return User_User_pb.UpdateUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_User_UpdateUserResponse(arg) {
  if (!(arg instanceof User_User_pb.UpdateUserResponse)) {
    throw new Error('Expected argument of type User.UpdateUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User_UpdateUserResponse(buffer_arg) {
  return User_User_pb.UpdateUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserService = exports.UserService = {
  // USER
getUser: {
    path: '/User.User/GetUser',
    requestStream: false,
    responseStream: false,
    requestType: User_User_pb.GetUserRequest,
    responseType: User_User_pb.GetUserResponse,
    requestSerialize: serialize_User_GetUserRequest,
    requestDeserialize: deserialize_User_GetUserRequest,
    responseSerialize: serialize_User_GetUserResponse,
    responseDeserialize: deserialize_User_GetUserResponse,
  },
  setUser: {
    path: '/User.User/SetUser',
    requestStream: false,
    responseStream: false,
    requestType: User_User_pb.SetUserRequest,
    responseType: User_User_pb.SetUserResponse,
    requestSerialize: serialize_User_SetUserRequest,
    requestDeserialize: deserialize_User_SetUserRequest,
    responseSerialize: serialize_User_SetUserResponse,
    responseDeserialize: deserialize_User_SetUserResponse,
  },
  updateUser: {
    path: '/User.User/UpdateUser',
    requestStream: false,
    responseStream: false,
    requestType: User_User_pb.UpdateUserRequest,
    responseType: User_User_pb.UpdateUserResponse,
    requestSerialize: serialize_User_UpdateUserRequest,
    requestDeserialize: deserialize_User_UpdateUserRequest,
    responseSerialize: serialize_User_UpdateUserResponse,
    responseDeserialize: deserialize_User_UpdateUserResponse,
  },
  deleteUser: {
    path: '/User.User/DeleteUser',
    requestStream: false,
    responseStream: false,
    requestType: User_User_pb.DeleteUserRequest,
    responseType: User_User_pb.DeleteUserResponse,
    requestSerialize: serialize_User_DeleteUserRequest,
    requestDeserialize: deserialize_User_DeleteUserRequest,
    responseSerialize: serialize_User_DeleteUserResponse,
    responseDeserialize: deserialize_User_DeleteUserResponse,
  },
  // ALL USERS
getAllUsers: {
    path: '/User.User/GetAllUsers',
    requestStream: false,
    responseStream: false,
    requestType: User_User_pb.GetAllUsersRequest,
    responseType: User_User_pb.GetAllUsersResponse,
    requestSerialize: serialize_User_GetAllUsersRequest,
    requestDeserialize: deserialize_User_GetAllUsersRequest,
    responseSerialize: serialize_User_GetAllUsersResponse,
    responseDeserialize: deserialize_User_GetAllUsersResponse,
  },
  // GET USER FOR AUTH
getUserAuth: {
    path: '/User.User/GetUserAuth',
    requestStream: false,
    responseStream: false,
    requestType: User_User_pb.GetUserAuthRequest,
    responseType: User_User_pb.GetUserAuthResponse,
    requestSerialize: serialize_User_GetUserAuthRequest,
    requestDeserialize: deserialize_User_GetUserAuthRequest,
    responseSerialize: serialize_User_GetUserAuthResponse,
    responseDeserialize: deserialize_User_GetUserAuthResponse,
  },
};

exports.UserClient = grpc.makeGenericClientConstructor(UserService);

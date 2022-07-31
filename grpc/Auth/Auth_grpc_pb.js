// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var Auth_Auth_pb = require('../Auth/Auth_pb.js');
var Schema_UserSchema_pb = require('../Schema/UserSchema_pb.js');

function serialize_Auth_GetAuthRequest(arg) {
  if (!(arg instanceof Auth_Auth_pb.GetAuthRequest)) {
    throw new Error('Expected argument of type Auth.GetAuthRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Auth_GetAuthRequest(buffer_arg) {
  return Auth_Auth_pb.GetAuthRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Auth_GetAuthResponse(arg) {
  if (!(arg instanceof Auth_Auth_pb.GetAuthResponse)) {
    throw new Error('Expected argument of type Auth.GetAuthResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Auth_GetAuthResponse(buffer_arg) {
  return Auth_Auth_pb.GetAuthResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Auth_SetAuthRequest(arg) {
  if (!(arg instanceof Auth_Auth_pb.SetAuthRequest)) {
    throw new Error('Expected argument of type Auth.SetAuthRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Auth_SetAuthRequest(buffer_arg) {
  return Auth_Auth_pb.SetAuthRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Auth_SetAuthResponse(arg) {
  if (!(arg instanceof Auth_Auth_pb.SetAuthResponse)) {
    throw new Error('Expected argument of type Auth.SetAuthResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Auth_SetAuthResponse(buffer_arg) {
  return Auth_Auth_pb.SetAuthResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var AuthService = exports.AuthService = {
  // Un
getAuth: {
    path: '/Auth.Auth/GetAuth',
    requestStream: false,
    responseStream: false,
    requestType: Auth_Auth_pb.GetAuthRequest,
    responseType: Auth_Auth_pb.GetAuthResponse,
    requestSerialize: serialize_Auth_GetAuthRequest,
    requestDeserialize: deserialize_Auth_GetAuthRequest,
    responseSerialize: serialize_Auth_GetAuthResponse,
    responseDeserialize: deserialize_Auth_GetAuthResponse,
  },
  setAuth: {
    path: '/Auth.Auth/SetAuth',
    requestStream: false,
    responseStream: false,
    requestType: Auth_Auth_pb.SetAuthRequest,
    responseType: Auth_Auth_pb.SetAuthResponse,
    requestSerialize: serialize_Auth_SetAuthRequest,
    requestDeserialize: deserialize_Auth_SetAuthRequest,
    responseSerialize: serialize_Auth_SetAuthResponse,
    responseDeserialize: deserialize_Auth_SetAuthResponse,
  },
};

exports.AuthClient = grpc.makeGenericClientConstructor(AuthService);

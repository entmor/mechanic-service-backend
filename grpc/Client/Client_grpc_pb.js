// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var Client_Client_pb = require('../Client/Client_pb.js');

function serialize_Client_DeleteClientRequest(arg) {
  if (!(arg instanceof Client_Client_pb.DeleteClientRequest)) {
    throw new Error('Expected argument of type Client.DeleteClientRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Client_DeleteClientRequest(buffer_arg) {
  return Client_Client_pb.DeleteClientRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Client_DeleteClientResponse(arg) {
  if (!(arg instanceof Client_Client_pb.DeleteClientResponse)) {
    throw new Error('Expected argument of type Client.DeleteClientResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Client_DeleteClientResponse(buffer_arg) {
  return Client_Client_pb.DeleteClientResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Client_GetAllClientsRequest(arg) {
  if (!(arg instanceof Client_Client_pb.GetAllClientsRequest)) {
    throw new Error('Expected argument of type Client.GetAllClientsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Client_GetAllClientsRequest(buffer_arg) {
  return Client_Client_pb.GetAllClientsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Client_GetAllClientsResponse(arg) {
  if (!(arg instanceof Client_Client_pb.GetAllClientsResponse)) {
    throw new Error('Expected argument of type Client.GetAllClientsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Client_GetAllClientsResponse(buffer_arg) {
  return Client_Client_pb.GetAllClientsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Client_GetClientRequest(arg) {
  if (!(arg instanceof Client_Client_pb.GetClientRequest)) {
    throw new Error('Expected argument of type Client.GetClientRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Client_GetClientRequest(buffer_arg) {
  return Client_Client_pb.GetClientRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Client_GetClientResponse(arg) {
  if (!(arg instanceof Client_Client_pb.GetClientResponse)) {
    throw new Error('Expected argument of type Client.GetClientResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Client_GetClientResponse(buffer_arg) {
  return Client_Client_pb.GetClientResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Client_SetClientRequest(arg) {
  if (!(arg instanceof Client_Client_pb.SetClientRequest)) {
    throw new Error('Expected argument of type Client.SetClientRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Client_SetClientRequest(buffer_arg) {
  return Client_Client_pb.SetClientRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Client_SetClientResponse(arg) {
  if (!(arg instanceof Client_Client_pb.SetClientResponse)) {
    throw new Error('Expected argument of type Client.SetClientResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Client_SetClientResponse(buffer_arg) {
  return Client_Client_pb.SetClientResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Client_UpdateClientRequest(arg) {
  if (!(arg instanceof Client_Client_pb.UpdateClientRequest)) {
    throw new Error('Expected argument of type Client.UpdateClientRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Client_UpdateClientRequest(buffer_arg) {
  return Client_Client_pb.UpdateClientRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Client_UpdateClientResponse(arg) {
  if (!(arg instanceof Client_Client_pb.UpdateClientResponse)) {
    throw new Error('Expected argument of type Client.UpdateClientResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Client_UpdateClientResponse(buffer_arg) {
  return Client_Client_pb.UpdateClientResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ClientService = exports.ClientService = {
  // Un
getClient: {
    path: '/Client.Client/GetClient',
    requestStream: false,
    responseStream: false,
    requestType: Client_Client_pb.GetClientRequest,
    responseType: Client_Client_pb.GetClientResponse,
    requestSerialize: serialize_Client_GetClientRequest,
    requestDeserialize: deserialize_Client_GetClientRequest,
    responseSerialize: serialize_Client_GetClientResponse,
    responseDeserialize: deserialize_Client_GetClientResponse,
  },
  setClient: {
    path: '/Client.Client/SetClient',
    requestStream: false,
    responseStream: false,
    requestType: Client_Client_pb.SetClientRequest,
    responseType: Client_Client_pb.SetClientResponse,
    requestSerialize: serialize_Client_SetClientRequest,
    requestDeserialize: deserialize_Client_SetClientRequest,
    responseSerialize: serialize_Client_SetClientResponse,
    responseDeserialize: deserialize_Client_SetClientResponse,
  },
  updateClient: {
    path: '/Client.Client/UpdateClient',
    requestStream: false,
    responseStream: false,
    requestType: Client_Client_pb.UpdateClientRequest,
    responseType: Client_Client_pb.UpdateClientResponse,
    requestSerialize: serialize_Client_UpdateClientRequest,
    requestDeserialize: deserialize_Client_UpdateClientRequest,
    responseSerialize: serialize_Client_UpdateClientResponse,
    responseDeserialize: deserialize_Client_UpdateClientResponse,
  },
  deleteClient: {
    path: '/Client.Client/DeleteClient',
    requestStream: false,
    responseStream: false,
    requestType: Client_Client_pb.DeleteClientRequest,
    responseType: Client_Client_pb.DeleteClientResponse,
    requestSerialize: serialize_Client_DeleteClientRequest,
    requestDeserialize: deserialize_Client_DeleteClientRequest,
    responseSerialize: serialize_Client_DeleteClientResponse,
    responseDeserialize: deserialize_Client_DeleteClientResponse,
  },
  getAllClients: {
    path: '/Client.Client/GetAllClients',
    requestStream: false,
    responseStream: false,
    requestType: Client_Client_pb.GetAllClientsRequest,
    responseType: Client_Client_pb.GetAllClientsResponse,
    requestSerialize: serialize_Client_GetAllClientsRequest,
    requestDeserialize: deserialize_Client_GetAllClientsRequest,
    responseSerialize: serialize_Client_GetAllClientsResponse,
    responseDeserialize: deserialize_Client_GetAllClientsResponse,
  },
};

exports.ClientClient = grpc.makeGenericClientConstructor(ClientService);

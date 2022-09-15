// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var Vehicle_Vehicle_pb = require('../Vehicle/Vehicle_pb.js');

function serialize_Vehicle_DeleteVehicleRequest(arg) {
  if (!(arg instanceof Vehicle_Vehicle_pb.DeleteVehicleRequest)) {
    throw new Error('Expected argument of type Vehicle.DeleteVehicleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Vehicle_DeleteVehicleRequest(buffer_arg) {
  return Vehicle_Vehicle_pb.DeleteVehicleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Vehicle_DeleteVehicleResponse(arg) {
  if (!(arg instanceof Vehicle_Vehicle_pb.DeleteVehicleResponse)) {
    throw new Error('Expected argument of type Vehicle.DeleteVehicleResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Vehicle_DeleteVehicleResponse(buffer_arg) {
  return Vehicle_Vehicle_pb.DeleteVehicleResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Vehicle_GetAllVehiclesRequest(arg) {
  if (!(arg instanceof Vehicle_Vehicle_pb.GetAllVehiclesRequest)) {
    throw new Error('Expected argument of type Vehicle.GetAllVehiclesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Vehicle_GetAllVehiclesRequest(buffer_arg) {
  return Vehicle_Vehicle_pb.GetAllVehiclesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Vehicle_GetAllVehiclesResponse(arg) {
  if (!(arg instanceof Vehicle_Vehicle_pb.GetAllVehiclesResponse)) {
    throw new Error('Expected argument of type Vehicle.GetAllVehiclesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Vehicle_GetAllVehiclesResponse(buffer_arg) {
  return Vehicle_Vehicle_pb.GetAllVehiclesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Vehicle_GetVehicleRequest(arg) {
  if (!(arg instanceof Vehicle_Vehicle_pb.GetVehicleRequest)) {
    throw new Error('Expected argument of type Vehicle.GetVehicleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Vehicle_GetVehicleRequest(buffer_arg) {
  return Vehicle_Vehicle_pb.GetVehicleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Vehicle_GetVehicleResponse(arg) {
  if (!(arg instanceof Vehicle_Vehicle_pb.GetVehicleResponse)) {
    throw new Error('Expected argument of type Vehicle.GetVehicleResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Vehicle_GetVehicleResponse(buffer_arg) {
  return Vehicle_Vehicle_pb.GetVehicleResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Vehicle_SetVehicleRequest(arg) {
  if (!(arg instanceof Vehicle_Vehicle_pb.SetVehicleRequest)) {
    throw new Error('Expected argument of type Vehicle.SetVehicleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Vehicle_SetVehicleRequest(buffer_arg) {
  return Vehicle_Vehicle_pb.SetVehicleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Vehicle_SetVehicleResponse(arg) {
  if (!(arg instanceof Vehicle_Vehicle_pb.SetVehicleResponse)) {
    throw new Error('Expected argument of type Vehicle.SetVehicleResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Vehicle_SetVehicleResponse(buffer_arg) {
  return Vehicle_Vehicle_pb.SetVehicleResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Vehicle_UpdateVehicleRequest(arg) {
  if (!(arg instanceof Vehicle_Vehicle_pb.UpdateVehicleRequest)) {
    throw new Error('Expected argument of type Vehicle.UpdateVehicleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Vehicle_UpdateVehicleRequest(buffer_arg) {
  return Vehicle_Vehicle_pb.UpdateVehicleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Vehicle_UpdateVehicleResponse(arg) {
  if (!(arg instanceof Vehicle_Vehicle_pb.UpdateVehicleResponse)) {
    throw new Error('Expected argument of type Vehicle.UpdateVehicleResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Vehicle_UpdateVehicleResponse(buffer_arg) {
  return Vehicle_Vehicle_pb.UpdateVehicleResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var VehicleService = exports.VehicleService = {
  // Un
getVehicle: {
    path: '/Vehicle.Vehicle/GetVehicle',
    requestStream: false,
    responseStream: false,
    requestType: Vehicle_Vehicle_pb.GetVehicleRequest,
    responseType: Vehicle_Vehicle_pb.GetVehicleResponse,
    requestSerialize: serialize_Vehicle_GetVehicleRequest,
    requestDeserialize: deserialize_Vehicle_GetVehicleRequest,
    responseSerialize: serialize_Vehicle_GetVehicleResponse,
    responseDeserialize: deserialize_Vehicle_GetVehicleResponse,
  },
  setVehicle: {
    path: '/Vehicle.Vehicle/SetVehicle',
    requestStream: false,
    responseStream: false,
    requestType: Vehicle_Vehicle_pb.SetVehicleRequest,
    responseType: Vehicle_Vehicle_pb.SetVehicleResponse,
    requestSerialize: serialize_Vehicle_SetVehicleRequest,
    requestDeserialize: deserialize_Vehicle_SetVehicleRequest,
    responseSerialize: serialize_Vehicle_SetVehicleResponse,
    responseDeserialize: deserialize_Vehicle_SetVehicleResponse,
  },
  updateVehicle: {
    path: '/Vehicle.Vehicle/UpdateVehicle',
    requestStream: false,
    responseStream: false,
    requestType: Vehicle_Vehicle_pb.UpdateVehicleRequest,
    responseType: Vehicle_Vehicle_pb.UpdateVehicleResponse,
    requestSerialize: serialize_Vehicle_UpdateVehicleRequest,
    requestDeserialize: deserialize_Vehicle_UpdateVehicleRequest,
    responseSerialize: serialize_Vehicle_UpdateVehicleResponse,
    responseDeserialize: deserialize_Vehicle_UpdateVehicleResponse,
  },
  deleteVehicle: {
    path: '/Vehicle.Vehicle/DeleteVehicle',
    requestStream: false,
    responseStream: false,
    requestType: Vehicle_Vehicle_pb.DeleteVehicleRequest,
    responseType: Vehicle_Vehicle_pb.DeleteVehicleResponse,
    requestSerialize: serialize_Vehicle_DeleteVehicleRequest,
    requestDeserialize: deserialize_Vehicle_DeleteVehicleRequest,
    responseSerialize: serialize_Vehicle_DeleteVehicleResponse,
    responseDeserialize: deserialize_Vehicle_DeleteVehicleResponse,
  },
  getAllVehicles: {
    path: '/Vehicle.Vehicle/GetAllVehicles',
    requestStream: false,
    responseStream: false,
    requestType: Vehicle_Vehicle_pb.GetAllVehiclesRequest,
    responseType: Vehicle_Vehicle_pb.GetAllVehiclesResponse,
    requestSerialize: serialize_Vehicle_GetAllVehiclesRequest,
    requestDeserialize: deserialize_Vehicle_GetAllVehiclesRequest,
    responseSerialize: serialize_Vehicle_GetAllVehiclesResponse,
    responseDeserialize: deserialize_Vehicle_GetAllVehiclesResponse,
  },
};

exports.VehicleClient = grpc.makeGenericClientConstructor(VehicleService);

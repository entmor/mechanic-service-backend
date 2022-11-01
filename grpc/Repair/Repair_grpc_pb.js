// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var Repair_Repair_pb = require('../Repair/Repair_pb.js');
var Schema_VehicleSchema_pb = require('../Schema/VehicleSchema_pb.js');

function serialize_Repair_DeleteAllRepairsByVehicleIdRequest(arg) {
  if (!(arg instanceof Repair_Repair_pb.DeleteAllRepairsByVehicleIdRequest)) {
    throw new Error('Expected argument of type Repair.DeleteAllRepairsByVehicleIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Repair_DeleteAllRepairsByVehicleIdRequest(buffer_arg) {
  return Repair_Repair_pb.DeleteAllRepairsByVehicleIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Repair_DeleteAllRepairsByVehicleIdResponse(arg) {
  if (!(arg instanceof Repair_Repair_pb.DeleteAllRepairsByVehicleIdResponse)) {
    throw new Error('Expected argument of type Repair.DeleteAllRepairsByVehicleIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Repair_DeleteAllRepairsByVehicleIdResponse(buffer_arg) {
  return Repair_Repair_pb.DeleteAllRepairsByVehicleIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Repair_DeleteRepairRequest(arg) {
  if (!(arg instanceof Repair_Repair_pb.DeleteRepairRequest)) {
    throw new Error('Expected argument of type Repair.DeleteRepairRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Repair_DeleteRepairRequest(buffer_arg) {
  return Repair_Repair_pb.DeleteRepairRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Repair_DeleteRepairResponse(arg) {
  if (!(arg instanceof Repair_Repair_pb.DeleteRepairResponse)) {
    throw new Error('Expected argument of type Repair.DeleteRepairResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Repair_DeleteRepairResponse(buffer_arg) {
  return Repair_Repair_pb.DeleteRepairResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Repair_GetAllRepairsRequest(arg) {
  if (!(arg instanceof Repair_Repair_pb.GetAllRepairsRequest)) {
    throw new Error('Expected argument of type Repair.GetAllRepairsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Repair_GetAllRepairsRequest(buffer_arg) {
  return Repair_Repair_pb.GetAllRepairsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Repair_GetAllRepairsResponse(arg) {
  if (!(arg instanceof Repair_Repair_pb.GetAllRepairsResponse)) {
    throw new Error('Expected argument of type Repair.GetAllRepairsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Repair_GetAllRepairsResponse(buffer_arg) {
  return Repair_Repair_pb.GetAllRepairsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Repair_GetRepairRequest(arg) {
  if (!(arg instanceof Repair_Repair_pb.GetRepairRequest)) {
    throw new Error('Expected argument of type Repair.GetRepairRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Repair_GetRepairRequest(buffer_arg) {
  return Repair_Repair_pb.GetRepairRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Repair_GetRepairResponse(arg) {
  if (!(arg instanceof Repair_Repair_pb.GetRepairResponse)) {
    throw new Error('Expected argument of type Repair.GetRepairResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Repair_GetRepairResponse(buffer_arg) {
  return Repair_Repair_pb.GetRepairResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Repair_SetRepairRequest(arg) {
  if (!(arg instanceof Repair_Repair_pb.SetRepairRequest)) {
    throw new Error('Expected argument of type Repair.SetRepairRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Repair_SetRepairRequest(buffer_arg) {
  return Repair_Repair_pb.SetRepairRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Repair_SetRepairResponse(arg) {
  if (!(arg instanceof Repair_Repair_pb.SetRepairResponse)) {
    throw new Error('Expected argument of type Repair.SetRepairResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Repair_SetRepairResponse(buffer_arg) {
  return Repair_Repair_pb.SetRepairResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Repair_UpdateRepairRequest(arg) {
  if (!(arg instanceof Repair_Repair_pb.UpdateRepairRequest)) {
    throw new Error('Expected argument of type Repair.UpdateRepairRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Repair_UpdateRepairRequest(buffer_arg) {
  return Repair_Repair_pb.UpdateRepairRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Repair_UpdateRepairResponse(arg) {
  if (!(arg instanceof Repair_Repair_pb.UpdateRepairResponse)) {
    throw new Error('Expected argument of type Repair.UpdateRepairResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Repair_UpdateRepairResponse(buffer_arg) {
  return Repair_Repair_pb.UpdateRepairResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var RepairService = exports.RepairService = {
  // Un
getRepair: {
    path: '/Repair.Repair/GetRepair',
    requestStream: false,
    responseStream: false,
    requestType: Repair_Repair_pb.GetRepairRequest,
    responseType: Repair_Repair_pb.GetRepairResponse,
    requestSerialize: serialize_Repair_GetRepairRequest,
    requestDeserialize: deserialize_Repair_GetRepairRequest,
    responseSerialize: serialize_Repair_GetRepairResponse,
    responseDeserialize: deserialize_Repair_GetRepairResponse,
  },
  setRepair: {
    path: '/Repair.Repair/SetRepair',
    requestStream: false,
    responseStream: false,
    requestType: Repair_Repair_pb.SetRepairRequest,
    responseType: Repair_Repair_pb.SetRepairResponse,
    requestSerialize: serialize_Repair_SetRepairRequest,
    requestDeserialize: deserialize_Repair_SetRepairRequest,
    responseSerialize: serialize_Repair_SetRepairResponse,
    responseDeserialize: deserialize_Repair_SetRepairResponse,
  },
  updateRepair: {
    path: '/Repair.Repair/UpdateRepair',
    requestStream: false,
    responseStream: false,
    requestType: Repair_Repair_pb.UpdateRepairRequest,
    responseType: Repair_Repair_pb.UpdateRepairResponse,
    requestSerialize: serialize_Repair_UpdateRepairRequest,
    requestDeserialize: deserialize_Repair_UpdateRepairRequest,
    responseSerialize: serialize_Repair_UpdateRepairResponse,
    responseDeserialize: deserialize_Repair_UpdateRepairResponse,
  },
  deleteRepair: {
    path: '/Repair.Repair/DeleteRepair',
    requestStream: false,
    responseStream: false,
    requestType: Repair_Repair_pb.DeleteRepairRequest,
    responseType: Repair_Repair_pb.DeleteRepairResponse,
    requestSerialize: serialize_Repair_DeleteRepairRequest,
    requestDeserialize: deserialize_Repair_DeleteRepairRequest,
    responseSerialize: serialize_Repair_DeleteRepairResponse,
    responseDeserialize: deserialize_Repair_DeleteRepairResponse,
  },
  getAllRepairs: {
    path: '/Repair.Repair/GetAllRepairs',
    requestStream: false,
    responseStream: false,
    requestType: Repair_Repair_pb.GetAllRepairsRequest,
    responseType: Repair_Repair_pb.GetAllRepairsResponse,
    requestSerialize: serialize_Repair_GetAllRepairsRequest,
    requestDeserialize: deserialize_Repair_GetAllRepairsRequest,
    responseSerialize: serialize_Repair_GetAllRepairsResponse,
    responseDeserialize: deserialize_Repair_GetAllRepairsResponse,
  },
  deleteAllRepairsByVehicleId: {
    path: '/Repair.Repair/DeleteAllRepairsByVehicleId',
    requestStream: false,
    responseStream: false,
    requestType: Repair_Repair_pb.DeleteAllRepairsByVehicleIdRequest,
    responseType: Repair_Repair_pb.DeleteAllRepairsByVehicleIdResponse,
    requestSerialize: serialize_Repair_DeleteAllRepairsByVehicleIdRequest,
    requestDeserialize: deserialize_Repair_DeleteAllRepairsByVehicleIdRequest,
    responseSerialize: serialize_Repair_DeleteAllRepairsByVehicleIdResponse,
    responseDeserialize: deserialize_Repair_DeleteAllRepairsByVehicleIdResponse,
  },
};

exports.RepairClient = grpc.makeGenericClientConstructor(RepairService);

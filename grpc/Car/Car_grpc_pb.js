// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var Car_Car_pb = require('../Car/Car_pb.js');

function serialize_Car_DeleteCarRequest(arg) {
  if (!(arg instanceof Car_Car_pb.DeleteCarRequest)) {
    throw new Error('Expected argument of type Car.DeleteCarRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Car_DeleteCarRequest(buffer_arg) {
  return Car_Car_pb.DeleteCarRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Car_DeleteCarResponse(arg) {
  if (!(arg instanceof Car_Car_pb.DeleteCarResponse)) {
    throw new Error('Expected argument of type Car.DeleteCarResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Car_DeleteCarResponse(buffer_arg) {
  return Car_Car_pb.DeleteCarResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Car_GetCarRequest(arg) {
  if (!(arg instanceof Car_Car_pb.GetCarRequest)) {
    throw new Error('Expected argument of type Car.GetCarRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Car_GetCarRequest(buffer_arg) {
  return Car_Car_pb.GetCarRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Car_GetCarResponse(arg) {
  if (!(arg instanceof Car_Car_pb.GetCarResponse)) {
    throw new Error('Expected argument of type Car.GetCarResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Car_GetCarResponse(buffer_arg) {
  return Car_Car_pb.GetCarResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Car_SetCarRequest(arg) {
  if (!(arg instanceof Car_Car_pb.SetCarRequest)) {
    throw new Error('Expected argument of type Car.SetCarRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Car_SetCarRequest(buffer_arg) {
  return Car_Car_pb.SetCarRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Car_SetCarResponse(arg) {
  if (!(arg instanceof Car_Car_pb.SetCarResponse)) {
    throw new Error('Expected argument of type Car.SetCarResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Car_SetCarResponse(buffer_arg) {
  return Car_Car_pb.SetCarResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Car_UpdateCarRequest(arg) {
  if (!(arg instanceof Car_Car_pb.UpdateCarRequest)) {
    throw new Error('Expected argument of type Car.UpdateCarRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Car_UpdateCarRequest(buffer_arg) {
  return Car_Car_pb.UpdateCarRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Car_UpdateCarResponse(arg) {
  if (!(arg instanceof Car_Car_pb.UpdateCarResponse)) {
    throw new Error('Expected argument of type Car.UpdateCarResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Car_UpdateCarResponse(buffer_arg) {
  return Car_Car_pb.UpdateCarResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CarService = exports.CarService = {
  // Un
getCar: {
    path: '/Car.Car/GetCar',
    requestStream: false,
    responseStream: false,
    requestType: Car_Car_pb.GetCarRequest,
    responseType: Car_Car_pb.GetCarResponse,
    requestSerialize: serialize_Car_GetCarRequest,
    requestDeserialize: deserialize_Car_GetCarRequest,
    responseSerialize: serialize_Car_GetCarResponse,
    responseDeserialize: deserialize_Car_GetCarResponse,
  },
  setCar: {
    path: '/Car.Car/SetCar',
    requestStream: false,
    responseStream: false,
    requestType: Car_Car_pb.SetCarRequest,
    responseType: Car_Car_pb.SetCarResponse,
    requestSerialize: serialize_Car_SetCarRequest,
    requestDeserialize: deserialize_Car_SetCarRequest,
    responseSerialize: serialize_Car_SetCarResponse,
    responseDeserialize: deserialize_Car_SetCarResponse,
  },
  updateCar: {
    path: '/Car.Car/UpdateCar',
    requestStream: false,
    responseStream: false,
    requestType: Car_Car_pb.UpdateCarRequest,
    responseType: Car_Car_pb.UpdateCarResponse,
    requestSerialize: serialize_Car_UpdateCarRequest,
    requestDeserialize: deserialize_Car_UpdateCarRequest,
    responseSerialize: serialize_Car_UpdateCarResponse,
    responseDeserialize: deserialize_Car_UpdateCarResponse,
  },
  deleteCar: {
    path: '/Car.Car/DeleteCar',
    requestStream: false,
    responseStream: false,
    requestType: Car_Car_pb.DeleteCarRequest,
    responseType: Car_Car_pb.DeleteCarResponse,
    requestSerialize: serialize_Car_DeleteCarRequest,
    requestDeserialize: deserialize_Car_DeleteCarRequest,
    responseSerialize: serialize_Car_DeleteCarResponse,
    responseDeserialize: deserialize_Car_DeleteCarResponse,
  },
};

exports.CarClient = grpc.makeGenericClientConstructor(CarService);

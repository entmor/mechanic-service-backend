// GENERATED CODE -- DO NOT EDIT!

// package: Car
// file: Car/Car.proto

import * as Car_Car_pb from "../Car/Car_pb";
import * as grpc from "@grpc/grpc-js";

interface ICarService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getCar: grpc.MethodDefinition<Car_Car_pb.GetCarRequest, Car_Car_pb.GetCarResponse>;
  setCar: grpc.MethodDefinition<Car_Car_pb.SetCarRequest, Car_Car_pb.SetCarResponse>;
  updateCar: grpc.MethodDefinition<Car_Car_pb.UpdateCarRequest, Car_Car_pb.UpdateCarResponse>;
  deleteCar: grpc.MethodDefinition<Car_Car_pb.DeleteCarRequest, Car_Car_pb.DeleteCarResponse>;
}

export const CarService: ICarService;

export interface ICarServer extends grpc.UntypedServiceImplementation {
  getCar: grpc.handleUnaryCall<Car_Car_pb.GetCarRequest, Car_Car_pb.GetCarResponse>;
  setCar: grpc.handleUnaryCall<Car_Car_pb.SetCarRequest, Car_Car_pb.SetCarResponse>;
  updateCar: grpc.handleUnaryCall<Car_Car_pb.UpdateCarRequest, Car_Car_pb.UpdateCarResponse>;
  deleteCar: grpc.handleUnaryCall<Car_Car_pb.DeleteCarRequest, Car_Car_pb.DeleteCarResponse>;
}

export class CarClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getCar(argument: Car_Car_pb.GetCarRequest, callback: grpc.requestCallback<Car_Car_pb.GetCarResponse>): grpc.ClientUnaryCall;
  getCar(argument: Car_Car_pb.GetCarRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Car_Car_pb.GetCarResponse>): grpc.ClientUnaryCall;
  getCar(argument: Car_Car_pb.GetCarRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Car_Car_pb.GetCarResponse>): grpc.ClientUnaryCall;
  setCar(argument: Car_Car_pb.SetCarRequest, callback: grpc.requestCallback<Car_Car_pb.SetCarResponse>): grpc.ClientUnaryCall;
  setCar(argument: Car_Car_pb.SetCarRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Car_Car_pb.SetCarResponse>): grpc.ClientUnaryCall;
  setCar(argument: Car_Car_pb.SetCarRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Car_Car_pb.SetCarResponse>): grpc.ClientUnaryCall;
  updateCar(argument: Car_Car_pb.UpdateCarRequest, callback: grpc.requestCallback<Car_Car_pb.UpdateCarResponse>): grpc.ClientUnaryCall;
  updateCar(argument: Car_Car_pb.UpdateCarRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Car_Car_pb.UpdateCarResponse>): grpc.ClientUnaryCall;
  updateCar(argument: Car_Car_pb.UpdateCarRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Car_Car_pb.UpdateCarResponse>): grpc.ClientUnaryCall;
  deleteCar(argument: Car_Car_pb.DeleteCarRequest, callback: grpc.requestCallback<Car_Car_pb.DeleteCarResponse>): grpc.ClientUnaryCall;
  deleteCar(argument: Car_Car_pb.DeleteCarRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Car_Car_pb.DeleteCarResponse>): grpc.ClientUnaryCall;
  deleteCar(argument: Car_Car_pb.DeleteCarRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Car_Car_pb.DeleteCarResponse>): grpc.ClientUnaryCall;
}

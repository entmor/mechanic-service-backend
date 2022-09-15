// GENERATED CODE -- DO NOT EDIT!

// package: Vehicle
// file: Vehicle/Vehicle.proto

import * as Vehicle_Vehicle_pb from "../Vehicle/Vehicle_pb";
import * as grpc from "@grpc/grpc-js";

interface IVehicleService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getVehicle: grpc.MethodDefinition<Vehicle_Vehicle_pb.GetVehicleRequest, Vehicle_Vehicle_pb.GetVehicleResponse>;
  setVehicle: grpc.MethodDefinition<Vehicle_Vehicle_pb.SetVehicleRequest, Vehicle_Vehicle_pb.SetVehicleResponse>;
  updateVehicle: grpc.MethodDefinition<Vehicle_Vehicle_pb.UpdateVehicleRequest, Vehicle_Vehicle_pb.UpdateVehicleResponse>;
  deleteVehicle: grpc.MethodDefinition<Vehicle_Vehicle_pb.DeleteVehicleRequest, Vehicle_Vehicle_pb.DeleteVehicleResponse>;
  getAllVehicles: grpc.MethodDefinition<Vehicle_Vehicle_pb.GetAllVehiclesRequest, Vehicle_Vehicle_pb.GetAllVehiclesResponse>;
}

export const VehicleService: IVehicleService;

export interface IVehicleServer extends grpc.UntypedServiceImplementation {
  getVehicle: grpc.handleUnaryCall<Vehicle_Vehicle_pb.GetVehicleRequest, Vehicle_Vehicle_pb.GetVehicleResponse>;
  setVehicle: grpc.handleUnaryCall<Vehicle_Vehicle_pb.SetVehicleRequest, Vehicle_Vehicle_pb.SetVehicleResponse>;
  updateVehicle: grpc.handleUnaryCall<Vehicle_Vehicle_pb.UpdateVehicleRequest, Vehicle_Vehicle_pb.UpdateVehicleResponse>;
  deleteVehicle: grpc.handleUnaryCall<Vehicle_Vehicle_pb.DeleteVehicleRequest, Vehicle_Vehicle_pb.DeleteVehicleResponse>;
  getAllVehicles: grpc.handleUnaryCall<Vehicle_Vehicle_pb.GetAllVehiclesRequest, Vehicle_Vehicle_pb.GetAllVehiclesResponse>;
}

export class VehicleClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getVehicle(argument: Vehicle_Vehicle_pb.GetVehicleRequest, callback: grpc.requestCallback<Vehicle_Vehicle_pb.GetVehicleResponse>): grpc.ClientUnaryCall;
  getVehicle(argument: Vehicle_Vehicle_pb.GetVehicleRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Vehicle_Vehicle_pb.GetVehicleResponse>): grpc.ClientUnaryCall;
  getVehicle(argument: Vehicle_Vehicle_pb.GetVehicleRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Vehicle_Vehicle_pb.GetVehicleResponse>): grpc.ClientUnaryCall;
  setVehicle(argument: Vehicle_Vehicle_pb.SetVehicleRequest, callback: grpc.requestCallback<Vehicle_Vehicle_pb.SetVehicleResponse>): grpc.ClientUnaryCall;
  setVehicle(argument: Vehicle_Vehicle_pb.SetVehicleRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Vehicle_Vehicle_pb.SetVehicleResponse>): grpc.ClientUnaryCall;
  setVehicle(argument: Vehicle_Vehicle_pb.SetVehicleRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Vehicle_Vehicle_pb.SetVehicleResponse>): grpc.ClientUnaryCall;
  updateVehicle(argument: Vehicle_Vehicle_pb.UpdateVehicleRequest, callback: grpc.requestCallback<Vehicle_Vehicle_pb.UpdateVehicleResponse>): grpc.ClientUnaryCall;
  updateVehicle(argument: Vehicle_Vehicle_pb.UpdateVehicleRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Vehicle_Vehicle_pb.UpdateVehicleResponse>): grpc.ClientUnaryCall;
  updateVehicle(argument: Vehicle_Vehicle_pb.UpdateVehicleRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Vehicle_Vehicle_pb.UpdateVehicleResponse>): grpc.ClientUnaryCall;
  deleteVehicle(argument: Vehicle_Vehicle_pb.DeleteVehicleRequest, callback: grpc.requestCallback<Vehicle_Vehicle_pb.DeleteVehicleResponse>): grpc.ClientUnaryCall;
  deleteVehicle(argument: Vehicle_Vehicle_pb.DeleteVehicleRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Vehicle_Vehicle_pb.DeleteVehicleResponse>): grpc.ClientUnaryCall;
  deleteVehicle(argument: Vehicle_Vehicle_pb.DeleteVehicleRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Vehicle_Vehicle_pb.DeleteVehicleResponse>): grpc.ClientUnaryCall;
  getAllVehicles(argument: Vehicle_Vehicle_pb.GetAllVehiclesRequest, callback: grpc.requestCallback<Vehicle_Vehicle_pb.GetAllVehiclesResponse>): grpc.ClientUnaryCall;
  getAllVehicles(argument: Vehicle_Vehicle_pb.GetAllVehiclesRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Vehicle_Vehicle_pb.GetAllVehiclesResponse>): grpc.ClientUnaryCall;
  getAllVehicles(argument: Vehicle_Vehicle_pb.GetAllVehiclesRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Vehicle_Vehicle_pb.GetAllVehiclesResponse>): grpc.ClientUnaryCall;
}

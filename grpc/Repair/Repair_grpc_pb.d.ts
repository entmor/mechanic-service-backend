// GENERATED CODE -- DO NOT EDIT!

// package: Repair
// file: Repair/Repair.proto

import * as Repair_Repair_pb from "../Repair/Repair_pb";
import * as grpc from "@grpc/grpc-js";

interface IRepairService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getRepair: grpc.MethodDefinition<Repair_Repair_pb.GetRepairRequest, Repair_Repair_pb.GetRepairResponse>;
  setRepair: grpc.MethodDefinition<Repair_Repair_pb.SetRepairRequest, Repair_Repair_pb.SetRepairResponse>;
  updateRepair: grpc.MethodDefinition<Repair_Repair_pb.UpdateRepairRequest, Repair_Repair_pb.UpdateRepairResponse>;
  deleteRepair: grpc.MethodDefinition<Repair_Repair_pb.DeleteRepairRequest, Repair_Repair_pb.DeleteRepairResponse>;
  getAllRepairs: grpc.MethodDefinition<Repair_Repair_pb.GetAllRepairsRequest, Repair_Repair_pb.GetAllRepairsResponse>;
  deleteAllRepairsByVehicleId: grpc.MethodDefinition<Repair_Repair_pb.DeleteAllRepairsByVehicleIdRequest, Repair_Repair_pb.DeleteAllRepairsByVehicleIdResponse>;
}

export const RepairService: IRepairService;

export interface IRepairServer extends grpc.UntypedServiceImplementation {
  getRepair: grpc.handleUnaryCall<Repair_Repair_pb.GetRepairRequest, Repair_Repair_pb.GetRepairResponse>;
  setRepair: grpc.handleUnaryCall<Repair_Repair_pb.SetRepairRequest, Repair_Repair_pb.SetRepairResponse>;
  updateRepair: grpc.handleUnaryCall<Repair_Repair_pb.UpdateRepairRequest, Repair_Repair_pb.UpdateRepairResponse>;
  deleteRepair: grpc.handleUnaryCall<Repair_Repair_pb.DeleteRepairRequest, Repair_Repair_pb.DeleteRepairResponse>;
  getAllRepairs: grpc.handleUnaryCall<Repair_Repair_pb.GetAllRepairsRequest, Repair_Repair_pb.GetAllRepairsResponse>;
  deleteAllRepairsByVehicleId: grpc.handleUnaryCall<Repair_Repair_pb.DeleteAllRepairsByVehicleIdRequest, Repair_Repair_pb.DeleteAllRepairsByVehicleIdResponse>;
}

export class RepairClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getRepair(argument: Repair_Repair_pb.GetRepairRequest, callback: grpc.requestCallback<Repair_Repair_pb.GetRepairResponse>): grpc.ClientUnaryCall;
  getRepair(argument: Repair_Repair_pb.GetRepairRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Repair_Repair_pb.GetRepairResponse>): grpc.ClientUnaryCall;
  getRepair(argument: Repair_Repair_pb.GetRepairRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Repair_Repair_pb.GetRepairResponse>): grpc.ClientUnaryCall;
  setRepair(argument: Repair_Repair_pb.SetRepairRequest, callback: grpc.requestCallback<Repair_Repair_pb.SetRepairResponse>): grpc.ClientUnaryCall;
  setRepair(argument: Repair_Repair_pb.SetRepairRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Repair_Repair_pb.SetRepairResponse>): grpc.ClientUnaryCall;
  setRepair(argument: Repair_Repair_pb.SetRepairRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Repair_Repair_pb.SetRepairResponse>): grpc.ClientUnaryCall;
  updateRepair(argument: Repair_Repair_pb.UpdateRepairRequest, callback: grpc.requestCallback<Repair_Repair_pb.UpdateRepairResponse>): grpc.ClientUnaryCall;
  updateRepair(argument: Repair_Repair_pb.UpdateRepairRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Repair_Repair_pb.UpdateRepairResponse>): grpc.ClientUnaryCall;
  updateRepair(argument: Repair_Repair_pb.UpdateRepairRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Repair_Repair_pb.UpdateRepairResponse>): grpc.ClientUnaryCall;
  deleteRepair(argument: Repair_Repair_pb.DeleteRepairRequest, callback: grpc.requestCallback<Repair_Repair_pb.DeleteRepairResponse>): grpc.ClientUnaryCall;
  deleteRepair(argument: Repair_Repair_pb.DeleteRepairRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Repair_Repair_pb.DeleteRepairResponse>): grpc.ClientUnaryCall;
  deleteRepair(argument: Repair_Repair_pb.DeleteRepairRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Repair_Repair_pb.DeleteRepairResponse>): grpc.ClientUnaryCall;
  getAllRepairs(argument: Repair_Repair_pb.GetAllRepairsRequest, callback: grpc.requestCallback<Repair_Repair_pb.GetAllRepairsResponse>): grpc.ClientUnaryCall;
  getAllRepairs(argument: Repair_Repair_pb.GetAllRepairsRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Repair_Repair_pb.GetAllRepairsResponse>): grpc.ClientUnaryCall;
  getAllRepairs(argument: Repair_Repair_pb.GetAllRepairsRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Repair_Repair_pb.GetAllRepairsResponse>): grpc.ClientUnaryCall;
  deleteAllRepairsByVehicleId(argument: Repair_Repair_pb.DeleteAllRepairsByVehicleIdRequest, callback: grpc.requestCallback<Repair_Repair_pb.DeleteAllRepairsByVehicleIdResponse>): grpc.ClientUnaryCall;
  deleteAllRepairsByVehicleId(argument: Repair_Repair_pb.DeleteAllRepairsByVehicleIdRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<Repair_Repair_pb.DeleteAllRepairsByVehicleIdResponse>): grpc.ClientUnaryCall;
  deleteAllRepairsByVehicleId(argument: Repair_Repair_pb.DeleteAllRepairsByVehicleIdRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<Repair_Repair_pb.DeleteAllRepairsByVehicleIdResponse>): grpc.ClientUnaryCall;
}

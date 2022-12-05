// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var protos_calculator_pb = require('../protos/calculator_pb.js');

function serialize_calculator_ComputeAverageRequest(arg) {
  if (!(arg instanceof protos_calculator_pb.ComputeAverageRequest)) {
    throw new Error('Expected argument of type calculator.ComputeAverageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_ComputeAverageRequest(buffer_arg) {
  return protos_calculator_pb.ComputeAverageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_ComputeAverageResponse(arg) {
  if (!(arg instanceof protos_calculator_pb.ComputeAverageResponse)) {
    throw new Error('Expected argument of type calculator.ComputeAverageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_ComputeAverageResponse(buffer_arg) {
  return protos_calculator_pb.ComputeAverageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_FindMaximumRequest(arg) {
  if (!(arg instanceof protos_calculator_pb.FindMaximumRequest)) {
    throw new Error('Expected argument of type calculator.FindMaximumRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_FindMaximumRequest(buffer_arg) {
  return protos_calculator_pb.FindMaximumRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_FindMaximumResponse(arg) {
  if (!(arg instanceof protos_calculator_pb.FindMaximumResponse)) {
    throw new Error('Expected argument of type calculator.FindMaximumResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_FindMaximumResponse(buffer_arg) {
  return protos_calculator_pb.FindMaximumResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_PrimeNumberDecompositionRequest(arg) {
  if (!(arg instanceof protos_calculator_pb.PrimeNumberDecompositionRequest)) {
    throw new Error('Expected argument of type calculator.PrimeNumberDecompositionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_PrimeNumberDecompositionRequest(buffer_arg) {
  return protos_calculator_pb.PrimeNumberDecompositionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_PrimeNumberDecompositionResponse(arg) {
  if (!(arg instanceof protos_calculator_pb.PrimeNumberDecompositionResponse)) {
    throw new Error('Expected argument of type calculator.PrimeNumberDecompositionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_PrimeNumberDecompositionResponse(buffer_arg) {
  return protos_calculator_pb.PrimeNumberDecompositionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SumRequest(arg) {
  if (!(arg instanceof protos_calculator_pb.SumRequest)) {
    throw new Error('Expected argument of type calculator.SumRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SumRequest(buffer_arg) {
  return protos_calculator_pb.SumRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SumResponse(arg) {
  if (!(arg instanceof protos_calculator_pb.SumResponse)) {
    throw new Error('Expected argument of type calculator.SumResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SumResponse(buffer_arg) {
  return protos_calculator_pb.SumResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CalculatorServiceService = exports.CalculatorServiceService = {
  // Unary RPC
sum: {
    path: '/calculator.CalculatorService/Sum',
    requestStream: false,
    responseStream: false,
    requestType: protos_calculator_pb.SumRequest,
    responseType: protos_calculator_pb.SumResponse,
    requestSerialize: serialize_calculator_SumRequest,
    requestDeserialize: deserialize_calculator_SumRequest,
    responseSerialize: serialize_calculator_SumResponse,
    responseDeserialize: deserialize_calculator_SumResponse,
  },
  // Server streaming RPC
primeNumberDecomposition: {
    path: '/calculator.CalculatorService/PrimeNumberDecomposition',
    requestStream: false,
    responseStream: true,
    requestType: protos_calculator_pb.PrimeNumberDecompositionRequest,
    responseType: protos_calculator_pb.PrimeNumberDecompositionResponse,
    requestSerialize: serialize_calculator_PrimeNumberDecompositionRequest,
    requestDeserialize: deserialize_calculator_PrimeNumberDecompositionRequest,
    responseSerialize: serialize_calculator_PrimeNumberDecompositionResponse,
    responseDeserialize: deserialize_calculator_PrimeNumberDecompositionResponse,
  },
  // Client streaming RPC
computeAverage: {
    path: '/calculator.CalculatorService/ComputeAverage',
    requestStream: true,
    responseStream: false,
    requestType: protos_calculator_pb.ComputeAverageRequest,
    responseType: protos_calculator_pb.ComputeAverageResponse,
    requestSerialize: serialize_calculator_ComputeAverageRequest,
    requestDeserialize: deserialize_calculator_ComputeAverageRequest,
    responseSerialize: serialize_calculator_ComputeAverageResponse,
    responseDeserialize: deserialize_calculator_ComputeAverageResponse,
  },
  // Bi-directional streaming RPC
findMaximum: {
    path: '/calculator.CalculatorService/FindMaximum',
    requestStream: true,
    responseStream: true,
    requestType: protos_calculator_pb.FindMaximumRequest,
    responseType: protos_calculator_pb.FindMaximumResponse,
    requestSerialize: serialize_calculator_FindMaximumRequest,
    requestDeserialize: deserialize_calculator_FindMaximumRequest,
    responseSerialize: serialize_calculator_FindMaximumResponse,
    responseDeserialize: deserialize_calculator_FindMaximumResponse,
  },
};

exports.CalculatorServiceClient = grpc.makeGenericClientConstructor(CalculatorServiceService);

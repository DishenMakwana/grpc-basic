var grpc = require('grpc');
var greets = require('../server/protos/greet_pb');
var service = require('../server/protos/greet_grpc_pb');

var calc = require('../server/protos/calculator_pb');
var calcService = require('../server/protos/calculator_grpc_pb');

function callGreetings() {
  console.log('Hello I am a gRPC client');

  var client = new service.GreetServiceClient(
    '127.0.0.1:50051',
    grpc.credentials.createInsecure()
  );

  var request = new greets.GreetRequest();

  var greeting = new greets.Greeting();
  greeting.setFirstName('John');
  greeting.setLastName('Doe');

  request.setGreeting(greeting);

  client.greet(request, (error, response) => {
    if (!error) {
      console.log('Greeting:', response.getResult());
    } else {
      console.error(error);
    }
  });
}

function callSum() {
  var client = new calcService.CalculatorServiceClient(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );

  var sumRequest = new calc.SumRequest();

  sumRequest.setFirstNumber(10);
  sumRequest.setSecondNumber(15);

  client.sum(sumRequest, (error, response) => {
    if (!error) {
      console.log(
        sumRequest.getFirstNumber() +
          ' + ' +
          sumRequest.getSecondNumber() +
          ' = ' +
          response.getSumResult()
      );
    } else {
      console.error(error);
    }
  });
}

function callGreetManyTimes() {
  var client = new service.GreetServiceClient(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );

  var request = new greets.GreetManyTimesRequest();

  var greeting = new greets.Greeting();
  greeting.setFirstName('John');
  greeting.setLastName('Doe');

  request.setGreeting(greeting);

  var call = client.greetManyTimes(request, () => {});

  call.on('data', (response) => {
    console.log('Greeting: ', response.getResult());
  });

  call.on('status', (status) => {
    console.log('status: ', status);
  });

  call.on('error', (error) => {
    console.error(error);
  });

  call.on('end', () => {
    console.log('Server has finished sending messages');
  });
}

function callPrimeNumberDecomposition() {
  var client = new calcService.CalculatorServiceClient(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );

  var request = new calc.PrimeNumberDecompositionRequest();

  var number = 48;

  request.setNumber(number);

  var call = client.primeNumberDecomposition(request, () => {});

  call.on('data', (response) => {
    console.log('Prime factor: ', response.getPrimeFactor());
  });

  call.on('status', (status) => {
    console.log('status: ', status);
  });

  call.on('error', (error) => {
    console.error(error);
  });

  call.on('end', () => {
    console.log('Server has finished sending messages');
  });
}

function callLongGreeting() {
  var client = new service.GreetServiceClient(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );

  var request = new greets.LongGreetRequest();

  var call = client.longGreet(request, (error, response) => {
    if (!error) {
      console.log('Server response: ', response.getResult());
    } else {
      console.log(error);
    }
  });

  let count = 0,
    intervalID = setInterval(function () {
      console.log('sending message ' + count);
      var request = new greets.LongGreetRequest();
      var greeting = new greets.Greeting();
      greeting.setFirstName('John');
      greeting.setLastName('Doe');

      request.setGreet(greeting);

      call.write(request);

      if (++count > 10) {
        clearInterval(intervalID);
        call.end();
      }
    }, 1000);
}

function callComputeAverage() {
  var client = new calcService.CalculatorServiceClient(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );

  var request = new calc.ComputeAverageRequest();

  var call = client.computeAverage(request, (error, response) => {
    if (!error) {
      console.log('Average: ', response.getAverage());
    } else {
      console.log(error);
    }
  });

  var request = new calc.ComputeAverageRequest();
  request.setNumber(1);

  var request2 = new calc.ComputeAverageRequest();
  request2.setNumber(2);

  var request3 = new calc.ComputeAverageRequest();
  request3.setNumber(3);

  var request4 = new calc.ComputeAverageRequest();
  request4.setNumber(4);

  var request5 = new calc.ComputeAverageRequest();
  request5.setNumber(5);

  call.write(request);
  call.write(request2);
  call.write(request3);
  call.write(request4);
  call.write(request5);

  call.end();
}

async function sleep(interval) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), interval);
  });
}

async function callBiDirect() {
  console.log('Hello I am a gRPC client');

  var client = new service.GreetServiceClient(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );

  var call = client.greetEveryone(request, (error, response) => {
    console.log('Server Response: ' + response);
  });

  call.on('data', (response) => {
    console.log('Hello Client! ' + response.getResult());
  });

  call.on('status', (status) => {
    console.log('status: ', status);
  });

  call.on('error', (error) => {
    console.error(error);
  });

  call.on('end', () => {
    console.log('Client The End');
  });

  for (var i = 0; i < 10; i++) {
    var greeting = new greets.Greeting();
    greeting.setFirstName('Stephane');
    greeting.setLastName('Maarek');

    var request = new greets.GreetEveryoneRequest();
    request.setGreeting(greeting);

    call.write(request);
    await sleep(1500);
  }

  call.end();
}

async function callBiDiFindMaximum() {
  console.log("hello I'm a gRPC Client");

  var client = new calcService.CalculatorServiceClient(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );

  var call = client.findMaximum(request, (error, response) => {});

  call.on('data', (response) => {
    console.log('Got new Max from Server => ' + response.getMaximum());
  });

  call.on('error', (error) => {
    console.error(error);
  });

  call.on('end', () => {
    console.log('Server is completed sending messages');
  });

  let data = [3, 5, 17, 9, 8, 30, 12, 345, 129, 0];

  for (var i = 0; i < data.length; i++) {
    var request = new calc.FindMaximumRequest();

    console.log('Sending number: ' + data[i]);

    request.setNumber(data[i]);

    call.write(request);
    await sleep(1000);
  }

  call.end();
}

function main() {
  // callGreetings();
  // callSum();
  // callGreetManyTimes();
  // callPrimeNumberDecomposition();
  // callLongGreeting();
  // callComputeAverage();
  // callBiDirect();
  callBiDiFindMaximum();
}

main();

var grpc = require('grpc');
var greets = require('../server/protos/greet_pb');
var service = require('../server/protos/greet_grpc_pb');

var calc = require('../server/protos/calculator_pb');
var calcService = require('../server/protos/calculator_grpc_pb');

/* 
  Implements the greet RPC method.
*/

function sum(call, callback) {
  var sumResponse = new calc.SumResponse();

  sumResponse.setSumResult(
    call.request.getFirstNumber() + call.request.getSecondNumber()
  );

  callback(null, sumResponse);
}

function greet(call, callback) {
  var greeting = new greets.GreetResponse();

  greeting.setResult(
    'Hello ' +
      call.request.getGreeting().getFirstName() +
      ' ' +
      call.request.getGreeting().getLastName()
  );

  callback(null, greeting);
}

function greetManyTimes(call, callback) {
  var firstName = call.request.getGreeting().getFirstName();

  let count = 0,
    intervalID = setInterval(() => {
      var greetManyTimesResponse = new greets.GreetManyTimesResponse();
      greetManyTimesResponse.setResult(firstName);

      // setup streaming
      call.write(greetManyTimesResponse);

      if (++count > 9) {
        clearInterval(intervalID);
        call.end();
      }
    }, 1000);
}

function primeNumberDecomposition(call, callback) {
  var number = call.request.getNumber();
  var divisor = 2;

  console.log('Received number: ', number);

  while (number > 1) {
    if (number % divisor === 0) {
      var primeNumberDecompositionResponse =
        new calc.PrimeNumberDecompositionResponse();

      primeNumberDecompositionResponse.setPrimeFactor(divisor);

      number = number / divisor;

      //write the message using call.write()
      call.write(primeNumberDecompositionResponse);
    } else {
      divisor++;
      console.log('Divisor has increased to ', divisor);
    }
  }

  call.end();
}

function longGreet(call, callback) {
  call.on('data', (request) => {
    var fullName =
      request.getGreet().getFirstName() +
      ' ' +
      request.getGreet().getLastName();

    console.log('Hello ', fullName);
  });

  call.on('error', (error) => {
    console.error(error);
  });

  call.on('end', () => {
    var response = new greets.LongGreetResponse();

    response.setResult('LongGreetClient Streaming ....');

    callback(null, response);
  });
}

function computeAverage(call, callback) {
  var sum = 0,
    count = 0;

  call.on('data', (request) => {
    sum += request.getNumber();

    console.log('Got number: ', request.getNumber());

    count++;
  });

  call.on('error', (error) => {
    console.error(error);
  });

  call.on('end', () => {
    var response = new calc.ComputeAverageResponse();

    response.setAverage(sum / count);

    callback(null, response);
  });
}

async function sleep(interval) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), interval);
  });
}

async function greetEveryone(call, callback) {
  call.on('data', (response) => {
    var fullName =
      response.getGreeting().getFirstName() +
      ' ' +
      response.getGreeting().getLastName();

    console.log('Hello ', fullName);
  });

  call.on('error', (error) => {
    console.error(error);
  });

  call.on('end', () => {
    var response = new greets.LongGreetResponse();

    response.setResult('GreetEveryOneClient Streaming ....');

    callback(null, response);
  });

  for (var i = 0; i < 10; i++) {
    // var greeting = new greets.Greeting()
    // greeting.setFirstName('John')
    // greeting.setLastName('Doe')

    var request = new greets.GreetEveryoneResponse();
    request.setResult('John Doe');

    call.write(request);
    await sleep(1000);
  }

  call.end();
}

function findMaximum(call, callback) {
  var currentMaximum = 0;
  var currentNumber = 0;

  call.on('data', (request) => {
    currentNumber = request.getNumber();

    if (currentNumber > currentMaximum) {
      currentMaximum = currentNumber;

      var response = new calc.FindMaximumResponse();
      response.setMaximum(currentMaximum);

      call.write(response);
    } else {
      //do nothing
    }

    console.log('Streamed number: ', request.getNumber());
  });

  call.on('error', (error) => {
    console.error(error);
  });

  call.on('end', () => {
    var response = new calc.FindMaximumResponse();
    response.setMaximum(currentMaximum);

    call.write(response);

    call.end();
    console.log('The end!');
  });
}

function main() {
  var server = new grpc.Server();

  server.addService(service.GreetServiceService, {
    greet: greet,
    greetManyTimes: greetManyTimes,
    longGreet: longGreet,
    greetEveryone: greetEveryone,
  });

  server.addService(calcService.CalculatorServiceService, {
    sum: sum,
    primeNumberDecomposition: primeNumberDecomposition,
    computeAverage: computeAverage,
    findMaximum: findMaximum,
  });

  server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());

  server.start();

  console.log('Server running at http://127.0.0.1:50051');
}

main();

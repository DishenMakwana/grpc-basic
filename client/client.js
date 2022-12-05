var grpc = require('grpc');
var greets = require('../server/protos/greet_pb');
var service = require('../server/protos/greet_grpc_pb');

var calc = require('../server/protos/calculator_pb');
var calcService = require('../server/protos/calculator_grpc_pb');

var blogs = require('../server/protos/blog_pb');
var blogService = require('../server/protos/blog_grpc_pb');

let fs = require('fs');

// let credentials = grpc.credentials.createSsl(
//   fs.readFileSync('../certs/ca.crt'),
//   fs.readFileSync('../certs/client.key'),
//   fs.readFileSync('../certs/client.crt')
// );

let unSafeCredentials = grpc.credentials.createInsecure();

function callGreetings() {
  console.log('Hello I am a gRPC client');

  var client = new service.GreetServiceClient('127.0.0.1:50051', credentials);

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
    credentials
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
  var client = new service.GreetServiceClient('localhost:50051', credentials);

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
    credentials
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
  var client = new service.GreetServiceClient('localhost:50051', credentials);

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
    credentials
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

  var client = new service.GreetServiceClient('localhost:50051', credentials);

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
    credentials
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

function getRPCDeadline(rpcType) {
  timeAllowed = 5000;

  switch (rpcType) {
    case 1:
      timeAllowed = 1000;
      break;
    case 2:
      timeAllowed = 7000;
      break;
    default:
      console.log('Invalid RPC Type: using default type');
  }

  return new Date(Date.now() + timeAllowed);
}

function doErrorCall() {
  var deadline = getRPCDeadline(1);

  console.log('Hello I am a gRPC client');

  var client = new service.GreetServiceClient('localhost:50051', credentials);

  var number = -1;
  var squareRootRequest = new calc.squareRootRequest();

  squareRootRequest.setNumber(number);

  client.squareRoot(
    squareRootRequest,
    { deadline: deadline },
    (error, response) => {
      if (!error) {
        console.log('Result: ', response.getNumberRoot());
      } else {
        console.error(error.message);
      }
    }
  );
}

function callListBlogs() {
  var client = new blogService.BlogServiceClient(
    'localhost:50051',
    // credentials
    grpc.credentials.createInsecure()
  );

  var emptyBlogRequest = new blogs.ListBlogRequest();

  var call = client.listBlog(emptyBlogRequest, (error, response) => {});

  call.on('data', (response) => {
    console.log('client streaming response: ', response.getBlog().toString());
  });

  call.on('error', (error) => {
    console.error(error);
  });

  call.on('end', () => {
    console.log('Server is completed sending messages');
  });
}

function callCreateBlog() {
  var client = new blogService.BlogServiceClient(
    'localhost:50051',
    // credentials
    grpc.credentials.createInsecure()
  );

  var blog = new blogs.Blog();
  blog.setAuthor('Stephane');
  blog.setTitle('My First Blog');
  blog.setContent('Content of the first blog');

  var blogRequest = new blogs.CreateBlogRequest();
  blogRequest.setBlog(blog);

  client.createBlog(blogRequest, (error, response) => {
    if (!error) {
      console.log('Blog has been created: ', response.toString());
    } else {
      console.error(error);
    }
  });
}

function callReadBlog() {
  var client = new blogService.BlogServiceClient('localhost:50051', unsafCreds);

  var readBlogRequest = new blogs.ReadBlogRequest();
  readBlogRequest.setBlogId('6');

  client.readBlog(readBlogRequest, (error, response) => {
    if (!error) {
      console.log('Found a blog ', response.toString());
    } else {
      if (error.code === grpc.status.NOT_FOUND) {
        console.log('Not found');
      } else {
        //do something else...
      }
    }
  });
}

function callUpdateBlog() {
  var client = new blogService.BlogServiceClient('localhost:50051', unsafCreds);

  var updateBlogRequest = new blogs.UpdateBlogRequest();

  var newBlog = new blogs.Blog();

  newBlog.setId('5');
  newBlog.setAuthor('James Bond now');
  newBlog.setTitle('Hello Up to date');
  newBlog.setContent('This is great, again!');

  updateBlogRequest.setBlog(newBlog);

  console.log('Blog...', newBlog.toString());

  client.updateBlog(updateBlogRequest, (error, response) => {
    if (!error) {
    } else {
      if (error.code === grpc.status.NOT_FOUND) {
        console.log('NOt found');
      } else {
      }
    }
  });
}

function callDeleteBlog() {
  var client = new blogService.BlogServiceClient('localhost:50051', unsafCreds);

  var deleteBlogRequest = new blogs.DeleteBlogRequest();
  var blogId = '6';

  deleteBlogRequest.setBlogId(blogId);

  client.deleteBlog(deleteBlogRequest, (error, response) => {
    if (!error) {
      console.log('Deleted blog with id: ', response.toString());
    } else {
      if (error.code === grpc.status.NOT_FOUND) {
        console.log('Not Found');
      } else {
        console.log('Sorry something went wrong');
      }
    }
  });
}

var unsafCreds = grpc.credentials.createInsecure();

function main() {
  // callGreetings();
  // callSum();
  // callGreetManyTimes();
  // callPrimeNumberDecomposition();
  // callLongGreeting();
  // callComputeAverage();
  // callBiDirect();
  // callBiDiFindMaximum();
  // doErrorCall();
  // callListBlogs();
  // callCreateBlog();
  // callReadBlog();
  // callUpdateBlog();
  callDeleteBlog();
}

main();

/****** this example is to demostrate how to read large file by consuming streams ****/
const fs = require("fs");
const server = require("http").createServer();

/***** case: read large text file from file system and send it to the client ******/
// case: file is too large! reading the whole file into a variable(data) and store it into memory can make the performance really bad
server.on("request", (req, res) => {
    fs.readFile("test-file.txt", (err, data) => {
      if (err) console.log(err);
      res.end(data);
  });
});

/****** solution 1: streams ******/
// there is no need to read the data from file into a variable
// just create a readable stream
// this solution can cause back-pressure when readable stream is way more faster then sending the resualt with the response writtable stream
// (receiving speed >>> responsing speed)

server.on("request", (req, res) => {
  
    const readable = fs.createReadStream("test-file.txt");
    readable.on("data", (chunk) => {
      // response is also a writtable stream
      res.write(chunk);
    });
    readable.on("end", () => {
      res.end();
    });
    readable.on("error", (err) => {
      console.log(err);
      res.statusCode = 500;
      res.end("file not found");
    });

  
});

/****** solution 2: streams + pipe ******/
// pipe the output of readable stream right into the input of a writable stream
// readablSource.pipe(writableDest)
server.on("request", (req, res) => {
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});

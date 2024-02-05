# Node.js-Streams

case: read large text file from file system and send it to the client

file is too large! reading the whole file into a variable(data) and store it into memory can make the performance really bad

solution 1: Stream

this solution can cause back-pressure when readable stream is way more faster then sending the resualt with the response writtable stream (receiving speed >>> responsing speed)

solution 2: stream + pipe

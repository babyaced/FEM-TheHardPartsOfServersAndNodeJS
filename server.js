const http = require('http');
const fs = require('fs');
const path = require('path');

function doOnRequest(request, response){
  // Send back a message saying "Welcome to Twitter"
  // code here...
  if (request.method === 'GET' && request.url === '/') {
    // read the index.html file and send it back to the client
    // code here...
    let pathName = path.join(__dirname, 'index.html');
    console.log(pathName)
    // fs.createReadStream()
    const homePage = fs.readFileSync(pathName,{encoding: "utf-8"})


    response.write(homePage)
    // response.writeHead(200, {'Content-Type': 'text/html'})
    response.end()
    return
  }
  else if (request.method === 'POST' && request.url === '/sayHi') {
    // code here...
    let pathName = path.join(__dirname, 'hi_log.txt');
    fs.appendFileSync(pathName,'Somebody said hi.\n')
    response.write('hi back to you!')
    response.end()
    return
  }
  else if (request.method === 'POST' && request.url === '/greeting') {
    // accumulate the request body in a series of chunks
    // code here...
    let pathName = path.join(__dirname, 'hi_log.txt');
    let requestBody = ''
    request.on('data', chunk => {
      console.log(`Data chunk available: ${chunk}`)
      requestBody += chunk
    })
    request.on('end', () => {
      fs.appendFileSync(pathName,requestBody + '\n')
      if(requestBody === 'hello'){
        response.write('hello there')
      }
      else if(requestBody === "what's up"){
        response.write('the sky')
      }
      response.end()
      return
    })
  }
  else {
    // Handle 404 error: page not found
    // code here...
    
  }
}

const server = http.createServer(doOnRequest)

server.listen(3000);

const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws')
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
let users = 0
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
    wss.broadcast = function broadcast(data) {
      wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };
wss.on('connection', function connection(ws) {

  users += 1
  const color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
  const startObj = { type: "userConnected", content: {totalUsers: users, color}}
  wss.broadcast(JSON.stringify(startObj))


  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    const obj = JSON.parse(message)
    obj.content.id = uuidv1()
    obj.content.totalUsers = users
    wss.broadcast(JSON.stringify(obj))
});




  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    users -= 1
    closingObj = {type: "userDisconnected", content: {totalUsers: users}}
    console.log(closingObj)
    wss.broadcast(JSON.stringify(closingObj))
  });
});
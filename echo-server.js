/**
Vagner Machado 
QCID 23651127

This is my TCP implementation RTF 862 for an Echo Server.
This echo server performs the following tasks:
	* Listens for connection on port 3015
	* Sends back to sender any data sent in.
	* This continues until client ends the connection.

Vagner

*/

"use strict"
//some constants to use in the script
const net = require("net");
const server = net.createServer();
const port = 3015;

//callback for server error
const connectionError = function (err) 
{
	console.log(err.message, "thrown by the server..");
};

//callback for server binding 
const connectionStart = function () {
	console.clear();
	console.log("Echo Server Bound, listing to port", port);
};

//callback for a new connection into server
const connectionListener = function(socket) 
{
	    //callback for client initiated end of connection
		const connectionEnd = function () 
		{
			console.log("Client with remote port", socket.remotePort ,"disconnected to echo server");
		};
		
		//handles data received from client
		const task = function(data)
		{
			socket.write(data);
			console.log("Echo to client in remote port", socket.remotePort,": ", data.toString());
		};
		
		//event listeners for socket
		socket.on("end", connectionEnd);
		//NOTE TO SELF: the pipe below does not require the listener for data that follows two lines below
		//socket.pipe(socket); //echos back what socket sends in
		socket.on("data", task) //listen for data and send it to callback fuction task	
};

//event listeners for server
server.on("error", connectionError);
server.on("connection", connectionListener);
server.on("listening", connectionStart);

//server listens to connecction in port 3015
server.listen(port);
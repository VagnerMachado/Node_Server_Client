/**
Vagner Machado 
QCID 23651127

This my implementation of a chat server. This chat server performs these tasks:
	* Binds and listens for connection on port 3015
	* Remote sockets of clients are printed onto console. 
	* Each socket connection made is added to an array of connections
	* When data is received, it broadcasts to all sockets but the sender socket
	* If client ends connection, the socket is removed from array of connections
	* Upon errors, error is printed without crashing th server.
	
	-Vagner
*/

"use strict"
const net = require("net");			// module for TCP connections
const server = net.createServer();  // creates a server
const connections = [];			    // array of connections
const port = 3015;				 	// the port server will listen for connections

//callback for server error
const connectionError = function (err) 
{
	console.log(err.message, "Error is thrown by the server!");
	throw err;
};

//callback for server start up
const connectionStart = function () 
{
	console.clear();
	console.log("Server Bound, listening to port", port);
};

//callback for a new connection into server 
const connectionListener = function(socket) 
{
		//callback for socket end of connection
		const connectionEnd = function () 
		{
			//finds the socket to end
			const index = connections.indexOf(socket);
			
			//removes the socket
			if (index > -1)
			{
				connections.splice(index, 1);
				console.log("Client on remote port", socket.remotePort, "disconnected from Echo Server at connections array index ", index);
			}
			//if this is even possible, print it. Socket to remove no longer exist.
			else
			{
				console.log("Could not find connection to terminate.");
			}	
		};
		
		//callback for data received by server: broadcast to all but sender
		const task = function(data)
		{
			//sends data to all clients that are not the sender
			let i = 0;
			for (i in connections)
				if(connections[i] != socket)
					connections[i].write(data);
			//prints to console info regarding regarding data sent to clients.
			let clients = connections.length == 2 ? "client" : "clients"; //0 clients, 1 client, 2 clients, fixing the 's' in client
			console.log("New Data Received:");
			console.log("Echo Server Sends", "\"".concat(data.toString().substring(0, data.length), "\""), "to", connections.length - 1, clients);
		};
		
		/*
		* Thank you for the tip! 
		* This socketError just prints information about the client that crashed instead of
		* actually throwing an error and crashing the server.
		*/
		const socketError = function (err) 
		{
			console.log("***", err.message, "error thrown in connection with remote port" , socket.remotePort, "***");
			connectionEnd(); //removes the connection with error from array of connections.
		};
		
		socket.on("end", connectionEnd);    // listen for an end event
		socket.on("data", task) 			//listen for data event and send data to callback fuction task	
		socket.on("error", socketError);	// listen for an error event and call socketError callback function
		connections.push(socket);           // add socket for the socket for current connection to array of connections
		console.log(socket.remotePort);		// prints to console the unique port used by client
};

//server event listeners
server.on("error", connectionError);
server.on("connection", connectionListener);
server.on("listening", connectionStart);

//socket in which server listens for connections.
server.listen(port);
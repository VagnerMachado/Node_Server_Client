/**
Vagner Machado 
QCID 23651127

This is my implementation of the RFC865 Quote of the Day Protocol for TCP connection.
 * This Node JS server listens for a connection on port 3014
 * Once a connection is established, a short message is sent out the connection.
 * Any data receives is disregarded.
 * The connection is closed by the server after sending the message.

*/

"use strict"
const net = require("net");
const port = 3014;
//I was going to add this quote array as a separate file but then you'd need it in you directory for it to work, so I just kept it here.
const quotes = ["Act as if what you do makes a difference. It does.\r\n-William James", 
				"Success is not final, failure is not fatal: it is the courage to continue that counts.\r\n-Winston Churchill",
				"Never bend your head. Always hold it high. Look the world straight in the eye.\r\n-Hellen Keller",
				"What you get by achieving your goals is not as important as what you become by achieving your goals.\r\n-Zig Ziglar",
				"Believe you can and you're halfway there.\r\n-Theodore Roosevelt",
				"I can't change the direction of the wind, but I can adjust my sails to always reach my destination.\r\n-Jimmy Dean",
				"If you believe in yourself, with a tiny pinch of magic all your dreams can come true!\r\n-Sponge Bob"		
			   ];
			   
//variable to hold random number representing the index in quote array
let quoteNumber;

//create a server
const server = net.createServer();

//handles the server throwing an error	
const connectionError = function (err) 
{
	console.log(err.message, " was thrown by server.");
};

//handles a connection to the QOTD server
const connectionListener = function(socket) 
{       //callback for end of connection by client
		const connectionEnd = function () 
		{
			console.log("Client disconnected.");
		};
		
		//callback for client error
		const connectionError = function (err) 
		{
			console.log(err.message, "thrown by the socket", socket.remotePort);
		};
		
		//socket event listeners
		socket.on("end", connectionEnd);
		socket.on("error", connectionError);
		
		console.log("Client connected on remote port ", socket.remotePort);
		//quoteNumber = Math.floor(Math.random() * 7); //optional for a new quote per connection
		//to use the line above, comment out the following two lines of uncommented code below.
		
		//randomize a quote so it is the same quote for the same day, based on current date
		let date = new Date();
		quoteNumber = ((date.getDate() + date.getUTCFullYear() + date.getMonth() + 1)% 7);
		
		console.log("Sending quote at quote array position ", quoteNumber, "and ending connection.");
		socket.end(quotes[quoteNumber]);
};

//handles the binding of the server
const connectionStart = function () 
{
	console.log("Server bound, listening on port", port);
};

//server event listeners
server.on("error", connectionError);
server.on("connection", connectionListener);
server.on("listening", connectionStart);

//start listening on the socket 3014
server.listen(port);
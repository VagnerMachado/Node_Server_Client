/**
Vagner Machado 
QCID 23651127

This is my implementation of a chat client.
	* Upon running, the client attempts to connect to chat server.
	* When connected, client is aked to choose a nickname. Case user hits enter, a random name is chosen.
	* Client is prompted for messages and messages typed in are sent to server. 
	* Data received from server is dispalyed on the console.

*/

//some variables to be used across the client script
const server_adress = "localhost";
const server_port = 3015;
const readline = require('readline');
const net  = require ('net');
let nickname = ""; 
let line = 1;

// this interface will be used to listen for user input
const io = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// when user types something and/or hits enter, data is processed
io.on('line', (input) => 
{
	//if the user wants to quit
	if(input == "/exit")
		client.end(connectionEnd);
	//deals with empty messages, hitting <enter> all the time would flood clients with blank messages
	else if (input == "\r\n" || input == "\n" || input == "")
	{
		line--;
		chat()
	}
	//if not previous, then process the input typed in by sending it to server and calling chat for new prompt
	else
	{
		process.stdout.clearLine();				
		client.write(nickname.concat(input));
		chat();
	}
});

//function called in between each input given by client, moves cursor and prints nickname.
const chat = function()
{
	process.stdout.cursorTo(0, ++line);
	console.log(nickname);
	process.stdout.cursorTo(nickname.length, line);
};

//callback function to handle data event, data received form server
const connectionData = function(data) {
	process.stdout.clearLine();
	process.stdout.cursorTo(0, line);
	console.log(data.toString());
	chat();
};

//calback function for end of connection event
const connectionEnd = function(){
	console.log("Client disconnected from Chat Server!");
	process.exit();
};

//callback function for start of connection to server
const connectionStart = function() 
{
	//asks for a nickname otherwise a random one is chosen
	console.clear();
	io.question('Choose a cool nickname:  ', (data) => 
	{	
	   if(data.length == 0)
		 data = "Troll_".concat(String(Math.floor(Math.random() * 10000)));
	   nickname = '['.concat(data, ']: ');
	   chat();
	});
};

//callback function to error event by client.
const connectionError = function(err)
{
		console.log("\r\n*** ", err.message, "thrown, disconnecting from server. ***");
		client.emit("end"); //only this would do what I wanted: close the process.
		/*I had tried:
			1: client.end(connectionEnd);
			2: client.end(function() {process.exit();});
		Both left the process hanging, so I read the events and decided to emit a end.
		*/		
};

//initiates the client connection to server using the parameters defined previously
const client = net.createConnection(server_port, server_adress, connectionStart);

//event listeners for the client
client.on('data', connectionData);   //listens for incoming data
client.on('end', connectionEnd);     // listens for end of connection 
client.on("error", connectionError); // listens for client error

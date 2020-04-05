# Node_Server_Client  

---  
 
These are four files that explore the exchange of data between server and clients using pipes and sockets in Node JS.
Here are the tasks each file accomplishes:   

## chat-client.js  

* Create a variable **nickname** on top, but don't set it to anything yet.
* Create a **readline** object to be used for I/O as shown in the following spec:   
> https://nodejs.org/api/readline.html#readline_readline    
* We implement the methods, **connectionData, connectionEnd, and connectionStart** as the client needs to accommodate for these three actions.
* **connectionStart()** will ask the user to choose a nickname and then call a new function **chat()**.
* Use the **readline.question()** method to capture input.
> https://nodejs.org/api/readline.html#readline_rl_question_query_callback
* **chat()**: 
	* Print the users nickname surrounded in braces
	* Wait for user input
	* Check if input is the string */exit*, if so use **socket.end()** and **process.exit();** to exit
	```javascript
    client.end(function(){process.exit();});
    ```
> client represents the variable name of the socket to be closed, it is not a keyword.   
> https://nodejs.org/api/net.html#net_socket_end_data_encoding_callback    

* Otherwise use **socket.write()** to send data to the server to be propagated to all clients, prefix the message with the users nickname in square braces.  
* Call the **chat()** function recursively. (Chat messages from the same user should be synchronous).    
* **connectionEnd()**: Will also print client disconnected.   
* **connectionData()**: Clear line and print data, print the **nickname** in the next line.   

---  

## chat-server.js  

The server will need to listen to the following events:
* **error**: Throw an error   
* **listening**: Print server bound to console.    
* **connection**: Called when a client connects.  Set up three listeners, then adds the socket of the current connection to an array of all connections.  Finally add **console.log(socket.remotePort);** to the end of the "connection" event handler to see the unique ports  being used by clients
* Once a connection is established the socket will listen to the following events:

	* **end**: print client disconnected and remove that socket from the connections array.
	* **error**: handle the error.
	* **data**: Use **socket.write()** to send the data to everyone except the current connection.

https://nodejs.org/api/net.html#net_socket_write_data_encoding_callback   

---  

## echo-server.js
  
* Write a TCP server according to RFC specifiation.  Use port 3015.
> https://tools.ietf.org/html/rfc862   

--- 

## qotd-sever.js   
* Write a TCP server according RFC specification. Use port 3014.    
> https://tools.ietf.org/html/rfc865      
* Have at least 7 different quotes that will change each day.    

**Vagner**
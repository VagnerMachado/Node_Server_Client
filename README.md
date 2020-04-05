# Node_Server_Client  

---  

These are four files that explore the exchange of date using pipes and sockets in Node JS.
Here are the tasks each file accomplishes:   

## chat-client.js  

* Create a variable **nickname** on top, but don't set it to anything yet.
* Create a **readline** object to be used for I/O as shown in the following spec:   
> https://nodejs.org/api/readline.html#readline_readline    
* We implement the methods, **connectionData, connectionEnd, and connectionStart** as the client needs to accommodate for these three actions.
* connectionStart() will ask the user to choose a nickname and then call a new function chat().
* Use the readline.question() method to capture input.
> https://nodejs.org/api/readline.html#readline_rl_question_query_callback
* chat(): 
	* Print the users nickname surrounded in braces
	* Wait for user input
	* Check if input is the string /exit, if so use socket.end() and process.exit(); to exit
> client.end(function(){process.exit();});   
> client represents the variable name of the socket to be closed, it is not a keyword.   
> https://nodejs.org/api/net.html#net_socket_end_data_encoding_callback    

* Otherwise use **socket.write()** to send data to the server to be propagated to all clients, prefix the message with the users nickname in square braces.
* Call the **chat()** function recursively. (Chat messages from the same user should be synchronous).  
* **connectionEnd()**: Will also print client disconnected
* **connectionData()**: Clear line and print data, print the **nickname** in the next line. 

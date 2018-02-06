// const server = require("http").Server();
const server = http.createServer(app);
const express = require("express");
const app = express();
const port = process.env.PORT || 10001;

var io = require("socket.io").listen(server);

var usernames = [],
	msgs = [];

app.get("/", (req, resp) => {
    resp.end("Hey");
})

app.listen(port, (err)=> {
    if(err) {
        console.log("Work? " + err);
        return false;
    }
})


io.on("connection", function(socket){
   console.log("user is connected");
    
    socket.on("username", (data) => {
        console.log("user is given username: "+data);
		usernames.push(data);
		
		io.emit("usersjoined", usernames);
    })
    
    socket.on("disconnect", () => {
        console.log("User has disconnected");
    })
	
	socket.on("sendMsg", (data) => {
		console.log("User has sent message");
		msgs.push(data);
		
		io.emit("msgsent", msgs);
	});
});

server.listen(port, (err)=>{
    if(err){
        console.log("Error: "+err);
        return false;
    }
    console.log("Socket port is running");
});
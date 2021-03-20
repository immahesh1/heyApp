const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Run when client connects
io.on('connection',socket => {
    //There are three ways of emiting msg
    //1.    socket.emit() --> to the user
    //2.    socket.broadcast.emit() --> to everyone except for the user
    //3.    io.emit() --> all the client in general
    socket.emit('message','Welcome to heyApp!');

    socket.broadcast.emit('message','A new user has joined:');

    //Runs when a user disconnects
    socket.on('disconnect',()=>{
        io.emit('message','A user has left the chat.');
    });

    //listen for chatMessage
    socket.on('chatMessage',msg=>{
        console.log(msg);
    })
});
const port = process.env.PORT || 4000;
server.listen(port,()=>console.log(`App started on port: ${port}`));
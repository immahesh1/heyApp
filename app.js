const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const messageFormat = require('./util/messages')


const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname,'public')));

const botname = 'heyApp Admin';

//Run when client connects
io.on('connection',socket => {
    //There are three ways of emiting msg
    //1.    socket.emit() --> to the user
    //2.    socket.broadcast.emit() --> to everyone except for the user
    //3.    io.emit() --> all the client in general
    socket.emit('message',messageFormat(botname,'Welcome to heyApp chatting platform.'));

    socket.broadcast.emit('message',messageFormat(botname,'A user has joined:'));

    //Runs when a user disconnects
    socket.on('disconnect',()=>{
        io.emit('message',messageFormat(botname,'A user has left the chat.'));
    });

    //listen for chatMessage
    socket.on('chatMessage',msg=>{
        console.log(msg);
        io.emit('message',messageFormat('User',msg));
    })
});
const port = process.env.PORT || 4000;
server.listen(port,()=>console.log(`App started on port: ${port}`));
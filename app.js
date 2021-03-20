const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const messageFormat = require('./util/messages')
const {userJoin,getCurrentUser,userLeave,getRoomUsers} = require('./util/users')


const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname,'public')));

const botname = 'heyApp Admin';

//Run when client connects
//There are three ways of emiting msg
    //1.    socket.emit() --> to the user
    //2.    socket.broadcast.emit() --> to everyone except for the user
    //3.    io.emit() --> all the client in general
io.on('connection',socket => {
    socket.on('joinRoom',({username,room})=>{
        const user = userJoin(socket.id, username, room);
        socket.join(user.room)
        //Welcome msg when a user joins chat
        socket.emit('message',messageFormat(botname,'Welcome to heyApp chatting platform.'));

        socket.broadcast.to(user.room).emit('message',messageFormat(botname,`${user.username} has joined the chat room.`));
    }); 
    
    //listen for chatMessage
    socket.on('chatMessage',msg=>{
        const user = getCurrentUser(socket.id);
        console.log(msg);
        io.to(user.room).emit('message',messageFormat(user.username,msg));
    });

    //Runs when a user disconnects
    socket.on('disconnect',()=>{
        const user = userLeave(socket.id);
        if(user){
            io.to(user.room).emit('message',messageFormat(botname,`${user.username} has left the chat.`));
        }
    });
});
const port = process.env.PORT || 4000;
server.listen(port,()=>console.log(`App started on port: ${port}`));
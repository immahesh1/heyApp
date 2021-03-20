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
    console.log('New WS connection...');

    socket.emit('msg','Welcome to heyApp created by Mahesh!')
});
const port = process.env.PORT || 4000;
server.listen(port,()=>console.log(`App started on port: ${port}`));
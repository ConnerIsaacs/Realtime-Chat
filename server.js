//initialize dependencies
const express = require('express');
const socket = require('socket.io');

//create app
const app = express();
const server = app.listen(8000);
const io = socket(server);

var connects = 0; //number of connected people
app.use(express.static('public'));

io.on('connection',(socket)=>{
 
    socket.on("chat",(data)=>{
        io.sockets.emit("chat",data);
    })
    socket.on("typing",(data)=>{
        socket.broadcast.emit("typing",data);
    })
  socket.on("notTyping",(data)=>{
    socket.broadcast.emit("notTyping");
  })
  socket.on("newConnection",()=>{
    connects++;
    io.sockets.emit("newConnection",connects);
  })
  socket.on("disconnect",()=>{
    connects--;
    io.sockets.emit("loseConnection",connects);
  })
});

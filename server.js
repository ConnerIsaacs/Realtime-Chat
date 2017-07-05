//initialize dependencies
const express = require('express');
const socket = require('socket.io');
const mongoose = require("mongoose");
//require schema
const newMessage = require("./index");
//create app
const app = express();
const server = app.listen(8000);
const io = socket(server);

//connect to mongoose database
mongoose.connect(process.env.MONGODB_URI="mongodb://Cylthus:079815e23h54tp@ds149412.mlab.com:49412/chat");
var connects = 0; //number of connected people
app.use(express.static('public'));

io.on('connection',(socket)=>{
 
    socket.on("chat",(data)=>{
      var x = new newMessage({
        Handle: data.handle,
        Message: data.message,
      });
      x.save();
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
  socket.on("announceConnect",()=>{
    socket.broadcast.emit("announceConnect");
  })
});

var socket = io.connect("https://realtime-chat.glitch.me/");

//Get DOM elements
const message = document.getElementById("message");
const handle  = document.getElementById("handle");
const btn     = document.getElementById("send");
const output  = document.getElementById("output");
const feedback= document.getElementById("feedback");

btn.addEventListener("click",()=>{
    socket.emit("chat",{
        message:message.value,
        handle:handle.value
    });
  socket.emit("notTyping");
  message.value = "";
});
socket.on('connect',()=>{
  socket.emit("newConnection");
  socket.emit("announceConnect");
})

message.addEventListener('keydown',(e)=>{
  if(e.keyCode == 13){
    socket.emit("chat",{
        message:message.value,
        handle:handle.value
    });
    
    message.value = "";
  }
    socket.emit("typing",handle.value);
});
message.addEventListener('keyup',(e)=>{
  if(e.keyCode == 13){
   
    socket.emit("notTyping");
    }});
socket.on("chat",(data)=>{
  if(data.handle == handle.value){
    output.innerHTML+="<p id='you'><strong id='you'>"+data.handle+": </strong>"+data.message+"</p>";
  }
  else{
    output.innerHTML+="<p><strong>"+data.handle+": </strong>"+data.message+"</p>";
  }
});
socket.on("typing",(data)=>{
    if(data != ""){
        feedback.innerHTML='<p><em>'+data + " is typing...</em></p>";
    }
    else{
        feedback.innerHTML='<p><em>an unnamed person is typing...</em></p>';
    }  
});
socket.on("notTyping",()=>{
  feedback.innerHTML='';
})
socket.on("newConnection",(connects)=>{
  document.getElementById("number").innerHTML="<p>"+connects+" member(s) currently in room</p>";
})
socket.on("announceConnect",()=>{
  output.innerHTML += "<p><span>New member has joined the room!</span></p>";
})
socket.on("loseConnection",(connects)=>{
  document.getElementById("number").innerHTML="<p>"+connects+" member(s) currently in room</p>";
  output.innerHTML += "<p><span>A member has left the room</span></p>";
})

const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

//Get username and room from URL
const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
});

const socket = io();

//Join chatroom
socket.emit('joinRoom',{username,room});

//Get room and users
socket.on('roomUsers',)

//Message from server
socket.on('message',message => {
    console.log(message);
    outputMessage(message);
    
    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit',e=>{
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    //Emit msg to server
    socket.emit('chatMessage',msg);

    //clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time} </span></p>
    <p class="text">${message.text}</p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

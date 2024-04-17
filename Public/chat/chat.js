// const { response } = require("express");

const buttonSend=document.getElementById("button-send");
const inputMessage=document.getElementById("input-message");

function getTokenHeaders(){
    const token=localStorage.getItem('token');
    

    if(token===null){
        window.location.href='../login/login.html'
    }
    const headers={autorization:token};
    return headers;
}

buttonSend.onclick=async event=>{
    try{
        if(inputMessage.value=='')
        return;
        const userId=localStorage.getItem('userId');
        const obj={
            chat:inputMessage.value,
            userId:userId
        }
        
        const headers=getTokenHeaders()
        if(!headers)
        {
            return;
        }
        
        const result=await axios.post('http://localhost:3100/chat/postChat',obj,{headers})
        
        //console.log(result.data.chat)
        //addChat(result.data.chat)
        

    }catch(err){
        if(err.response)
        {
            console.log(err.response)
        }
        else{
            console.log(err)
        }
            
    } 

    inputMessage.value=''
}

// Function to fetch chat messages
async function fetchChatMessages() {
    try {
        const response = await axios.get('http://localhost:3100/chat/getChat');
        const chatData = response.data.data;
        
        // Clear existing messages from the chat container
        const messageContainer = document.getElementById('chat-container');
        messageContainer.innerHTML = ''; // Remove all child elements
        
        // Append new messages to the chat container
        chatData.forEach(element => {
            showChat(element);
        });
    } catch (err) {
        console.error('Error fetching chat data:', err);
    }
};

// Function to display a single chat message
function showChat(messageObj) {
    const messageContainer = document.getElementById('chat-container');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(messageContainer.children.length % 2 === 0 ? 'odd' : 'even');

    // Check if messageObj has the 'name' property
    if (messageObj.name) {
        messageElement.textContent = `${messageObj.name}: ${messageObj.chat}`;
    } else {
        // If 'name' property is missing, just display the chat message
        messageElement.textContent = messageObj.chat;
    }

    messageContainer.appendChild(messageElement);
}

// Fetch chat messages initially
fetchChatMessages();

// Poll for new messages every 2 seconds
setInterval(fetchChatMessages, 2000);

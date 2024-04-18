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
        
        // Save the latest messages to localStorage
        saveChat2Local(chatData);

        // Clear existing messages from the chat container and load from local storage
        loadAndDisplayChats();
    } catch (err) {
        console.error('Error fetching chat data:', err);
    }
};

// Load and display chats from local storage
function loadAndDisplayChats() {
    const chats = fetchLocalChats();
    const messageContainer = document.getElementById('chat-container');
    messageContainer.innerHTML = ''; // Clear existing messages

    chats.forEach(messageObj => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(messageContainer.children.length % 2 === 0 ? 'odd' : 'even');

        if (messageObj.name) {
            messageElement.textContent = `${messageObj.name}: ${messageObj.chat}`;
        } else {
            messageElement.textContent = messageObj.chat;
        }

        messageContainer.appendChild(messageElement);
    });
}

// Fetch chat messages initially and setup interval to refresh messages
fetchChatMessages();
setInterval(fetchChatMessages, 2000);

function fetchLocalChats() {
    let data = localStorage.getItem('localChats');
    return data ? JSON.parse(data) : [];
}

function saveChat2Local(chats) {
    // Fetch existing chats from local storage
    let localChats = fetchLocalChats();
    
    // Combine new and old chats, and keep only the latest 10 entries
    localChats = [...chats, ...localChats].slice(0, 10);

    // Save updated chat list to local storage
    localStorage.setItem('localChats', JSON.stringify(localChats));
}

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

window.addEventListener("DOMContentLoaded", async () => {
    try {
        // Make a GET request to fetch chat data
        const response = await axios.get('http://localhost:3100/chat/getChat');
        // Access the data from the response
        const chatData = response.data.data;
        chatData.forEach(element=>{
            showChat(element);
        })
        console.log(chatData); // Do something with the chat data
    } catch (err) {
        console.error('Error fetching chat data:', err);
    }
});

function showChat(messageObj) {
    // Get the message container
    const messageContainer = document.getElementById('chat-container');

    // Create a new message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(messageContainer.children.length % 2 === 0 ? 'odd' : 'even'); // Alternate odd and even messages for styling
    
    // Format the message: name: message
    const formattedMessage = `${messageObj.name}: ${messageObj.chat}`;
    
    // Set the text content of the message element
    messageElement.textContent = formattedMessage;
    
    // Append the message element to the message container
    messageContainer.appendChild(messageElement);
}


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
        
        const result=axios.post('http://localhost:3100/chat/postChat',obj,{headers})
        
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
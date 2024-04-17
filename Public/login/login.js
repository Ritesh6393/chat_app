const inputEmail=document.getElementById('input-email')
const inputPassword=document.getElementById('input-password')
const labelStatus=document.getElementById('status-label')



document.getElementById('form-login').addEventListener('submit',async event=>{
    labelStatus.textContent=''
    event.preventDefault();
    obj={
        email:inputEmail.value,
        password:inputPassword.value
    }
    try{
        const result= await axios.post('http://localhost:3100/user/login',obj)
        
        labelStatus.innerText='Login Successfull!'
        alert("Login Successfull !")
        
        localStorage.setItem('token',token)
        localStorage.setItem('userId',result.data.userId)
        
            
        
    }
    catch(err){
        
        const status=err.response.status
        labelStatus.style.color='red'

        if(status==401){
            labelStatus.textContent='Invalid Passsword!'

        }
        else if(status==404){
            labelStatus.textContent="User not found!"

        }
        else{
            labelStatus.textContent="Something went wrong!"
        }
    }
})
const form = document.querySelector('#form');  
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const pnumber = document.querySelector('#pnumber');
const  password = document.querySelector('#password');
const  cpassword = document.querySelector('#cpassword');

form,addEventListener('submit',(e)=>{
    
    if(!validateInputs()){
        e.preventDefault();
    }
})

function validateInputs(){
    const usernameVal = username.value.trim();
    const emailVal = email.value.trim();
    const pnumberVal = pnumber.value.trim();
    const passwordVal = password.value.trim();
    const cpasswordVal = cpassword.value.trim();
    let success = true

    if(usernameVal===''){
        success=false
        setErrror(username,'Username is required')
    }
    else
        setSuccess(username)

    if(emailVal===''){
        success=false
        setErrror(email,'Email is required')
    }
    else if(!validateEmail(emailVal)){
        success=false
        setErrror(email,'Please enter a valid email')
    }
    else{
        setSuccess(email)
    }
    if(pnumberVal ===''){
        success=false
        setErrror(pnumber,'Phone number is required')
    }
    else if(pnumberVal.length<10){
        success=false
        setErrror(pnumber,'Phone number must be atleast 10 charecter')
    }
    else{
        setSuccess(pnumber)
    }
    if(passwordVal===''){
        success=false
        setErrror(password,'Password is required')
    }
    else if(passwordVal.length<8){
        success=false
        setErrror(password,'Password must be atleast 8 charecter')
    }
    else{
        setSuccess(password)
    }
    if(cpasswordVal===''){
        success=false
        setErrror(cpassword,'Confim Password is required')
    }
    else if(cpasswordVal!==passwordVal){
        success=false
        setErrror(cpassword,'password does not match')
    }
    else if(cpasswordVal.length<8){
        success=false
        setErrror(cpassword,'Password must be atleast 8 charecter')
    }
    else{
        setSuccess(cpassword)
    }

    return success;
}

function setErrror(element,message){
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.error');

    errorElement.innerText = message;
    inputGroup.classList.add('error')
    inputGroup.classList.add('success')
}

function setSuccess(element,message){
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.error');

    errorElement.innerText = '';
    inputGroup.classList.add('success')
    inputGroup.classList.add('err')
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
};

const inputs = document.querySelectorAll('input[type="text"] , input[type="email"], input[type="password"]');
let countError=0;
const displayError = (type,field, message) => {
    
    
    const fieldTarget = document.querySelector(`.container-${field}`);
    const small = fieldTarget.querySelector('small');
    const progressBar = fieldTarget.querySelector('p.progressBar')

    if(type === 'error') {
      fieldTarget.classList.add('error');
      small.textContent = message;
      progressBar.classList.add('error')
    } 
}

const removeError = (field,message="") => {
    const fieldTarget = document.querySelector(`.container-${field}`);
    const small = fieldTarget.querySelector('small');
    const progressBar = fieldTarget.querySelector('p.progressBar');
    fieldTarget.classList.remove('error');
    small.textContent = message;
    progressBar.classList.remove('error');
    progressBar.classList.add('success');
}

const pseudoChecker = (value) => {
    
    if(value.length < 4 || value.length > 20) {
        displayError('error','pseudo','Le pseudo doit avoir entre 4 et 20 caractères')
       countError++;
        return false;
    }
    else if(value.length > 4  && value.length < 20) {
     removeError('pseudo')
     countError=0;
     return true;
}
}

const emailChecker = (value) => {
    
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if( !re.test(String(value).toLowerCase()) ) {
        displayError('error','email',"Le format de l'email n'est pas valide")
        countError++;
        return false;
    }
    else {
        removeError('email',"")
        countError=0;
        return true
    }
}

const passwordChecker = (password) => {
    
    confirmPassword(document.querySelector('#confirmPassword').value)

}

const confirmPassword = (passwordConfirm) => {

    const password = document.querySelector('#password').value;
   
    if(password != passwordConfirm ) {
        displayError('error','confirmPassword',' Les mots de passe ne correspondent pas');
        countError++;
    }
    else {

        removeError('confirmPassword');
        countError=0;
    }
   
}


inputs.forEach(input => {
    input.addEventListener('input', (e) => {
        
        switch(e.target.id) {
            case "pseudo":
                pseudoChecker(e.target.value);
                break;

            case "email":
                emailChecker(e.target.value);
                break;

            case "password":
                passwordChecker(e.target.value);
                break;

            case "confirmPassword":
                confirmPassword(e.target.value);
                break;


        }

    })
})

const register = (e) => {
    e.preventDefault();

    console.log(countError);
    if(countError >1) {
        console.log('c pas bon');
    }
}


myForm.addEventListener('submit',register)










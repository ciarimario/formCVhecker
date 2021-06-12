const inputs = document.querySelectorAll('input[type="text"] , input[type="email"], input[type="password"]');
let countError=0;
let verifyPseudo=false;
let verifyEmail = false;
let verifyPassword = false;
let verifyConfirmPassword=false;
const displayError = (type,field, message) => {
    
    
    const fieldTarget = document.querySelector(`.container-${field}`);
    const small = fieldTarget.querySelector('small');
    const progressBar = fieldTarget.querySelector('p.progressBar')
    const i = fieldTarget.querySelector('i.fas');

    if(type === 'error') {
      fieldTarget.classList.add('error');
      small.textContent = message;
      progressBar.classList.add('error')
      i.classList.add('error')
    } 
}

const removeError = (field,message="",progressBarStrength="strong") => {
    const fieldTarget = document.querySelector(`.container-${field}`);
    const small = fieldTarget.querySelector('small');
    const progressBar = fieldTarget.querySelector('p.progressBar');
    const i = fieldTarget.querySelector('i.fas');
    fieldTarget.classList.remove('error');
    small.textContent = message;
    progressBar.classList.remove('error');
    if(progressBarStrength == 'medium') {
        progressBar.classList.add('success50');
    } else if(progressBarStrength == 'strong') {
        progressBar.classList.remove("success50")
        progressBar.classList.add('success');
    }
    i.classList.remove('error');
    i.classList.add('success');
}

const pseudoChecker = (value) => {
    
    if(value.length < 4 || value.length > 20) {
        displayError('error','pseudo','Le pseudo doit avoir entre 4 et 20 caractères')
       verifyPseudo = false;
    }
    else if(value.length > 4  && value.length < 20) {
     removeError('pseudo')
     verifyPseudo = true;
}
}

const emailChecker = (value) => {
    
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if( !re.test(String(value).toLowerCase()) ) {
        displayError('error','email',"Le format de l'email n'est pas valide")
        verifyEmail = false;
    }
    else {
        removeError('email',"")
        verifyEmail = true;
    }
}

const passwordChecker = (password) => {

    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    if(password.length < 8) {
        displayError('error','password','Le mot de passe doit contenir au moins 8 caractères')
        verifyPassword=false;
    } else {
        if(strongRegex.test(password)) {
            removeError('password','Sécurité password forte')
            verifyPassword=true;
    
        } else if(mediumRegex.test(password)) {
            removeError('password','Sécurité password moyenne','medium')
            verifyPassword = true;
        } else {
            displayError('error','password','Le mot de passe doit contenir au moins 1 majuscule, 1 chiffre et 1 caractère spécial');
            verifyPassword = false;
        }
    }
    
    
    confirmPassword(document.querySelector('#confirmPassword').value)

}

const confirmPassword = (passwordConfirm) => {

    const password = document.querySelector('#password').value;
   
    if(password != passwordConfirm ) {
        displayError('error','confirmPassword',' Les mots de passe ne correspondent pas');
        verifyConfirmPassword = false;
    }
    else {

        removeError('confirmPassword');
        verifyConfirmPassword=true;
    }
   
}


inputs.forEach(input => {
    input.addEventListener('input', (e) => {
        
        switch(e.target.id) {
            case "pseudo":
                pseudoChecker(e.target.value);
                checkAllFields();
                break;
                
                case "email":
                emailChecker(e.target.value);
                checkAllFields();
                break;

            case "password":
                passwordChecker(e.target.value);
                checkAllFields();
                break;

            case "confirmPassword":
                confirmPassword(e.target.value);
                checkAllFields();
                break;


        }

    })
})

const checkAllFields = () => {

    if(verifyPseudo && verifyEmail && verifyPassword && verifyConfirmPassword) {
        submit.disabled = false;
    } else {
        submit.disabled = true;
    }
}
const register = (e) => {
    e.preventDefault();
    if(verifyPseudo && verifyEmail && verifyPassword && verifyConfirmPassword) {
        submit.disabled = false;
        
    } else {

    }
    
}


myForm.addEventListener('submit',register)










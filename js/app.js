const inputs = document.querySelectorAll('input[type="text"] , input[type="email"], input[type="password"]');

const displayError = (type,field, message) => {
    
    
    const fieldTarget = document.querySelector(`.container-${field}`);
    const small = fieldTarget.querySelector('small');

    if(type === 'error') {
      fieldTarget.classList.add('error');
      small.textContent = message;
    } 
}

const removeError = (field,message="") => {
    const fieldTarget = document.querySelector(`.container-${field}`);
    const small = fieldTarget.querySelector('small');

    fieldTarget.classList.remove('error');
    small.textContent = message;

}

const pseudoChecker = (value) => {
    
    if(value.length < 4 || value.length > 20) {
        displayError('error','pseudo','Le pseudo doit avoir entre 4 et 20 caractères',)
    }
    else if(value.length > 4  && value.length < 20) {
     removeError('pseudo')
}
}

const emailChecker = (value) => {
    
    if(value.length < 4 || value.length > 20) {
        displayError('error','email',"Le format de l'email n'est pas valide",)
    }
    else if(value.length > 4  && value.length < 20) {
     removeError('email')
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
                passwordChecker();
                break;

            case "confirmPassword":
                console.log('vous etes sur confirmation');
                break;


        }

    })
})










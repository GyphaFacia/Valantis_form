function sendErrorMessage(errorMessage){
    alert(errorMessage)
}

function checkAllInputs(){
    const inputs = [...inputsSection.querySelectorAll('input')]

    const phone = inputs[1].value
    const mail = inputs[2].value
    const noContactsErrorMessage = formNoContactsErrorMessage(phone, mail)
    if(noContactsErrorMessage){
        sendErrorMessage(noContactsErrorMessage)
        return false
    }

    for(let i = 0; i < inputs.length; i++){
        if(!checkInput(inputs[i])){
            return false
        }
    }

    return true
}

function checkInput(inputElement){
    const evalItemName = dropdownMenu.value
    const inputName = inputElement.getAttribute('name')

    const inputData = EVAL_OPTIONS[evalItemName][inputName] ??
                      DEFAULT_INPUTS[inputName]
    const formErrorMessage = inputData.formErrorMessage ?? (() => '')

    const errorMessage = formErrorMessage(inputElement)

    if(errorMessage){
        sendErrorMessage(`Поле "${inputName}": ${errorMessage}`)
        return false
    }
    return true
}

function handleFormSubmit(e){
    e.preventDefault()

    if(e.submitter !== submitButton){
        return false
    }
    if(!checkAllInputs()){
        return false
    }

    const inputsSelector = 'input:not([type=file]):not([type=submit])'
    const inputs = [...evalForm.querySelectorAll(inputsSelector), textArea]

    const data = new FormData()
    inputs.forEach(
        input => data.append(input.name, input.value)
    );
    [...fileInput.files].forEach(
        file => data.append('photos', file)
    )

    const request = fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: data,
    })
    .then(resp => resp.json())
    .then(json => console.log(json))
    .catch(e => console.warn(e))


    console.log('Sent')
    return false
}

evalForm.onsubmit = handleFormSubmit;

[...document.querySelectorAll('input')].forEach(element => {
    element.removeAttribute('required')
});
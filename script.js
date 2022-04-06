document.onclick = checkAllInputs
checkAllInputs()


function checkAllInputs(){
    [...inputsSection.querySelectorAll('input')].forEach(
        input => checkInput(input)
    )
}

function checkInput(inputElement){
    const evalItemName = dropdownMenu.value
    const inputName = inputElement.getAttribute('name')

    const inputData = EVAL_OPTIONS[evalItemName][inputName] ?? DEFAULT_INPUTS[inputName]
    const formErrorMessage = inputData.formErrorMessage ?? (() => '')

    const errorMessage = formErrorMessage(inputElement)

    if(errorMessage){
        inputElement.setCustomValidity(errorMessage)
        inputElement.reportValidity()
    }
}



function handleDropdownMenuOptionChange(){
    const newOption = dropdownMenu.value
    const oldOption = dropdownMenu.getAttribute('old-value')

    if(newOption !== oldOption){
        dropdownMenuOptionChanged()
    }

    dropdownMenu.setAttribute('old-value', newOption)
}

function removeOldInputs(){
    [...inputsSection.children].slice(4).forEach(input => {
        inputsSection.removeChild(input)
    })
}

function createNewInput(inputName, inputType, isRequired){
    if(inputType == 'checkbox'){
        return createNewCheckbox(inputName)
    }

    inputsSection.createChild = createChild
    const inputWrapper = inputsSection.createChild({
        tagName: 'div',
        className: 'eval-content-inputs-top-input-wrapper',
    })
    
    inputWrapper.createChild = createChild
    const inputElement = inputWrapper.createChild({
        tagName: 'input',
        className: 'form-input',
        name: inputName,
        type: inputType,
        required: isRequired ?? false
    })

    createPlaceholder(inputWrapper, inputName, isRequired ?? false)
    applyNumericInputsRestrictions(inputElement, inputType)
}

function createNewCheckbox(inputName){
    const checkboxWrapper = inputsSection.createChild({
        tagName: 'div',
        className: 'eval-content-inputs-top-input-wrapper form-checkbox-wrapper',
    })
    checkboxWrapper.createChild = createChild

    const checkboxElement = checkboxWrapper.createChild({
        tagName: 'input',
        className: 'form-checkbox',
        type: 'checkbox',
        name: inputName,
        id: inputName,
    })

    const labelElement = checkboxWrapper.createChild({
        tagName: 'label',
        text: inputName,
        className: 'form-checkbox-label',
        for: inputName,
    })

    const checkboxCustom = checkboxWrapper.createChild({
        tagName: 'span',
        className: 'form-checkbox-custom',
    })

    checkboxWrapper.onclick = ()=>{
        checkboxElement.click()
    }
   
    return checkboxElement
}

function createPlaceholder(parentNode, placeholderText, isRequired){
    parentNode.createChild = createChild
    const placeholderElement = parentNode.createChild({
        tagName: 'span',
        text: placeholderText,
        className: isRequired ? 'placeholder placeholder--important' : 'placeholder'
    })

    const inputElement = parentNode.children[0]
    inputElement.onfocus = ()=>{
        placeholderElement.style.opacity = 0
    }
    inputElement.onblur = ()=>{
        if(inputElement.value){
            return null
        }
        placeholderElement.style.opacity = 1
    }
}

function dropdownMenuOptionChanged(){
    const optionsInputs = EVAL_OPTIONS[dropdownMenu.value]
    removeOldInputs()
    
    Object.keys(optionsInputs).forEach(
        inputName => createNewInput(
            inputName, 
            optionsInputs[inputName].type,
            optionsInputs[inputName].required
        )
    )
}

// добавить плейсхолдеры для трёх постоянных инпутов (имени, телефона, почты)
function addPlaceholdersToDefaultInputs(){
    const existingInputsWrappers = [...inputsSection.children].slice(0, 3)
    existingInputsWrappers.forEach(
        wrapper => createPlaceholder(
            wrapper, 
            wrapper.children[0].getAttribute('placeholder'),
            false,
        )
    )
}

dropdownMenu.onchange = handleDropdownMenuOptionChange
dropdownMenuOptionChanged()
addPlaceholdersToDefaultInputs()

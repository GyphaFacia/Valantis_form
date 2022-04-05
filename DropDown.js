// добавить опции для выпадающего меню типа изделия
function constructDropMenu(dropdown, options){
    Object.keys(options).forEach(key => {
        const option = dropdown.createChild({
            tagName: 'option',
            text: key,
            value: key,
        })
    })    

    dropdown.setAttribute('prev', dropdown.value)
    dropdown.addEventListener('change', () => {
            const actuallyChanged = dropdown.getAttribute('prev') === dropdown.value
            if(!actuallyChanged){
                handleDropDownMenuChange(dropdown, options)
                dropdown.setAttribute('prev', dropdown.value)
            }
        }
    )
}

// обработать смену выбора типа изделия, добавить соответствующие инпуты
function handleDropDownMenuChange(dropdown, options){
    removeOldInputs()
    const inputs = options[dropdown.value]
    Object.keys(inputs).forEach(
        key => createInput(key, inputs[key])
    )
}

// убрать инпуты старого состояния меню выбора типа изделия
function removeOldInputs(){
    const childs = inputsSection.children
    for(let i = 4; i <= childs.length; i++){
        const child = childs[i]
        if(!child){ continue }
        setTimeout(()=>{
            inputsSection.removeChild(child)
        }, 0)
    }
}

// добавить инпут указанного типа
function createInput(inputName, inputSettings){
    const wrapper = inputsSection.createChild({
        tagName: 'div',
        className: 'eval-content-inputs-top-input-wrapper',
    })
    wrapper.createChild = createChild

    if(inputSettings.type !== 'checkbox'){
         const input = wrapper.createChild({
            tagName: 'input',
            className: 'form-input',
            placeholder: inputName,
            name: inputName,
            type: inputSettings.type,
            value: inputSettings.default ?? "",
            required: inputSettings.required ?? false
        })

        if(inputSettings.type === 'number' && inputSettings.step){
            console.log(input, inputSettings.step)
            input.setAttribute('step', inputSettings.step)
        }
        if(inputSettings.type === 'number' && (inputSettings.min ?? undefined) !== undefined){
            input.setAttribute('min', inputSettings.min)
        }
        if(inputSettings.type === 'number' && (inputSettings.max ?? undefined) !== undefined){
            input.setAttribute('max', inputSettings.max)
        }

        if(inputSettings.validation){
            input.oninput = inputSettings.validation
            input.onpaste = inputSettings.validation
            input.setAttribute('autocomplete', 'new-password')
        }

        addAsterisksToRequiredInputs()
        return input
    }

    // checkbox case
    const input = wrapper.createChild({
        tagName: 'input',
        className: 'form-checkbox',
        type: inputSettings.type,
        name: inputName,
        id: inputName,
    })
    input.checked = inputSettings.default

    const label = wrapper.createChild({
        tagName: 'label',
        text: inputName,
        className: 'form-checkbox-label',
        for: inputName,
    })
    wrapper.classList.add('form-checkbox-wrapper')

    const checkboxCustom = wrapper.createChild({
        tagName: 'span',
        className: 'form-checkbox-custom',
    })

    wrapper.onclick = (e)=>{
        input.click()
    }
   
    addAsterisksToRequiredInputs()
    return input
}


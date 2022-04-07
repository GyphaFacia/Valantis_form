function sendErrorMessage(errorMessage) {
    createNotification(errorMessage)
}

function checkAllInputs() {
    const inputs = [...inputsSection.querySelectorAll('input')]

    const phone = inputs[1].value
    const mail = inputs[2].value
    const noContactsErrorMessage = formNoContactsErrorMessage(phone, mail)
    if (noContactsErrorMessage) {
        sendErrorMessage(noContactsErrorMessage)
        return false
    }

    for (let i = 0; i < inputs.length; i++) {
        if (!checkInput(inputs[i])) {
            return false
        }
    }

    return true
}

function checkInput(inputElement) {
    const evalItemName = dropdownMenu.value
    const inputName = inputElement.getAttribute('name')

    const inputData =
        EVAL_OPTIONS[evalItemName][inputName] ?? DEFAULT_INPUTS[inputName]
    const formErrorMessage = inputData.formErrorMessage ?? (() => '')

    const errorMessage = formErrorMessage(inputElement)
    if (errorMessage) {
        sendErrorMessage(`Поле "${inputName}": ${errorMessage}`)
        return false
    }
    return true
}

function handleFormSubmit(e) {
    e.preventDefault()

    if (e.submitter !== submitButton) {
        return
    }
    if (!checkAllInputs()) {
        return
    }

    const inputsSelector = 'input:not([type=file]):not([type=submit])'
    const textArea = evalForm.querySelector('text-area')
    const inputs = [...evalForm.querySelectorAll(inputsSelector), textArea]

    const data = new FormData()
    inputs.forEach(
        (input) => data.append(input.name, input.value)
    );
    [...fileInput.files].forEach(
        (file, i) => data.append(`photo${i}`, file)
    )

    const request = fetch('http://localhost:5000/upload', {
        method: 'POST',
        mode: 'no-cors',
        body: data,
    })
        .then((resp) => {
            console.log(resp)
            return resp.json()
        })
        .then((json) => console.log(json))
        .catch((e) => console.warn(e))

    console.log('Form and files are sent')
}

evalForm.onsubmit = handleFormSubmit

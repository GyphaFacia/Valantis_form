const options = {
    'Ювелирное изделие': {
        'Металл': {
            required: true,
            type: 'text',
        },
        'Проба': {
            required: true,
            type: 'number',
            validation: validateInt,
            step: 1,
            min: 0,
        },
        'Вес гр.': {
            required: true,
            type: 'number',
            validation: validateFloat,
            min: 0,
        },
    },
    'Драгоценные камни': {
        'Вес в каратах': {
            required: true,
            type: 'number',
            validation: validateFloat,
            min: 0,
        },
        'Наличие документов':{
            type: 'checkbox',
            default: false,
        },
    },
    'Шубы': {
        'Вид меха': {
            required: true,
            type: 'text',
        },
        'Состояние изделия':{
            required: true,
            type: 'text',
        }
    },
    'Техника Apple': {
        'Модель': {
            required: true,
            type: 'text'
        },
        'Объем памяти': {
            required: true,
            type: 'number',
            validation: validateInt,
            step: 1,
            min: 0,
        }
    },
    'Антиквариат': {},
    'Другое': {},
}



async function handleFormSubmit(e){
    if(e.submitter !== submitButton){ return false }

    e.preventDefault()
    const evalType = dropdown.value // тип изделия
    const evalData = options[evalType] // поля от типа изделия

    const defaultInputs = 'Name Phone Mail'.split(' ').map(
        key => evalForm[key]
    )
    const extraInputs = Object.keys(evalData).map(
        key => evalForm[key]
    )
    const inputsVals = [
        ...defaultInputs,
        ...extraInputs
    ].map(
        inp => inp.getAttribute('type') === 'checkbox' ? inp.checked : inp.value
    )
    
    let [name, phone, mail] = inputsVals

    if(!name){ return alert('Поле имени не может быть пустым')}

    if(!phone && !mail){ return alert('Введите Ваш номер телефона или адрес электронной почты') }

    if(phone && validatePhone(phone)){ return alert(validatePhone(phone)) }

    if(mail && validateMail(mail)){ return alert(validateMail(mail)) }

    const obj = Object.keys(options[dropdown.value]).reduce(
        (acc, cur, i)=>({
            ...acc,
            [cur]: inputsVals[i+3]
        })
    , {})
    obj.name = name
    obj.mail = mail
    obj.phone = phone
    obj.comment = textArea?.value?.trim() ?? ''

    const data = new FormData()
    Object.keys(obj).forEach( // ключи объекта
        key => data.append(key, obj[key])
    )
    const files = [...document.querySelector('input[type="file"]').files]
    files.forEach(
        f => data.append('photos', f)
    )

    const request = fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: data,
    })
    .then(resp => resp.json())
    .then(json => console.log(json))
    .catch(e => console.warn(e))

    return true
}


const evalForm = document.forms['eval-form']
evalForm.onsubmit = handleFormSubmit

const dropdown = document.querySelector('select.form-input')
dropdown.createChild = createChild

const inputsSection = evalForm.children[0].children[0]
inputsSection.createChild = createChild

const textArea = document.querySelector('textarea')

const submitButton = evalForm.querySelector('input[type="submit"]')

constructDropMenu(dropdown, options)

setTimeout(()=>{
    dropdown.value = 'Ювелирное изделие'
    handleDropDownMenuChange(dropdown, options)
}, 0)





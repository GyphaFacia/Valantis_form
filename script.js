// Во всех случаях так же присутствует поле для загрузки изображений. 
// Изначально по центру поля расположена картинка "Загрузить фото". 
// При клике на картинку открывается диалог выбора файла. 
// После выбора в форме появляется перевью изображения. При наведении на изображение в его углу появляется крестик.
// При нажатии на крестик изображение удаляется из формы. Ограничение 9 картинок.

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



function handleFormSubmit(e){
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

    if(!name){
        alert('Поле имени не может быть пустым')
        return null
    }

    if(!phone && !mail){
        alert('Введите Ваш номер телефона или адрес электронной почты')
        return null
    }

    if(phone && validatePhone(phone)){
        alert(validatePhone(phone))
        return null
    }

    if(mail && validateMail(mail)){
        alert(validateMail(mail))
        return null 
    }

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
    obj.files = photos.map(({file}) => file)

    console.log(obj)

    e.preventDefault()
    return false
}


const evalForm = document.forms['eval-form']
evalForm.onsubmit = handleFormSubmit

const dropdown = document.querySelector('select.form-input')
dropdown.createChild = createChild

const inputsSection = evalForm.children[0].children[0]
inputsSection.createChild = createChild

const textArea = document.querySelector('textarea')

addAsterisksToRequiredInputs()
constructDropMenu(dropdown, options)
setTimeout(()=>{
    dropdown.value = 'Ювелирное изделие'
    handleDropDownMenuChange(dropdown, options)
}, 0)

// setTimeout(() => {
//     const inputs = [...inputsSection.querySelectorAll('input')]

//     inputs[0].value = 'Name'
//     inputs[1].value = '+7 499 123 45 67'
//     inputs[2].value = 'some@mail.ru'

//     inputs[3].value = 'золото'
//     inputs[4].value = '333'
//     inputs[5].value = '50'

//     textArea.value = 'test '.repeat(5)
// }, 100);




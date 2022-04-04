// email и телефон - одно из них обязательно к заполнению. К заполнению обязательно хотя бы одно.

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
            min: 333,
            // max: 750,
        },
        'Вес гр.': {
            required: true,
            type: 'number',
            validation: validateFloat,
            min: 0,
            // max: 1000000,
        },
    },
    'Драгоценные камни': {
        'Вес в каратах': {
            required: true,
            type: 'number',
            validation: validateFloat,
            min: 0,
            // max: 3106,
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
            // max: 512,
        }
    },
    'Антиквариат': {},
    'Другое': {},
}


// 10-minute-mail - осознанный выбор пользователя
// async function checkEmail(mail){
//     try {
//         const API = 'https://api.testmail.top/domain/check?data='
//         const url = `${API}${mail}`
//         const resp = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdGVzdG1haWwudG9wIiwiYXVkIjoiaHR0cHM6XC9cL2FwaS50ZXN0bWFpbC50b3AiLCJ1c2VyIjoiNjI0YTQxMmI5ZGFiMiIsInN1YiI6ImFwaSIsImlhdCI6MTY0OTAzMzUzMiwiZXhwIjo0ODA0NzEwNzMyfQ.CNz8DdGV-63NHoI3uUB7jgI047JrF7LSO_ihkANlX4E'
//             }
//         })
//         const {result, message} = await resp.json()
//         return {result, message}
//     } catch (error) {
//         console.warn(error)
//         return {result: false, message: '...'}        
//     }
// }

function handleFormSubmit(e){
    let inputs = [...form.querySelectorAll('input')].map(inp => inp.value)
    let [name, phone, mail] = inputs

    // if(!name){
    //     alert('Поле имени не может быть пустым')
    //     return null
    // }

    // if(!phone && !mail){
    //     alert('Введите Ваш номер телефона или адрес электронной почты')
    //     return null
    // }

    // if(phone && validatePhone(phone)){
    //     alert(validatePhone(phone))
    //     return null
    // }

    // if(mail && validateMail(mail)){
    //     alert(validateMail(mail))
    //     return null 
    // }

    // if(mail){
    //     try {
    //         const domain = mail.split('@').pop()
    //         const resp = await checkEmail(domain)
    //         if(!resp.result){
    //             if()
    //             alert(`Нам не знаком ваш почтовый ящик "${domain}"`)
    //             return null
    //         }
    //     } catch (error) {
    //         console.warn(error)
    //     }
    // }
    
    const keys = Object.keys(options[dropdown.value]).map(
        (key, i) => ({[key] : inputs[i + 3]})
    )
    console.log(keys)

    e.preventDefault()
    console.log('OK')
    return false
}


const dropdown = document.querySelector('select.form-input')
dropdown.createChild = createChild
const inputsSection = document.querySelector('.eval-content-inputs-top')
inputsSection.createChild = createChild
addAsterisksToRequiredInputs()
constructDropMenu(dropdown, options)
setTimeout(()=>{
    dropdown.value = 'Ювелирное изделие'
    handleDropDownMenuChange(dropdown, options)
}, 0)
const form = document.querySelector('form.eval-content-inputs')
form.onsubmit = handleFormSubmit


// Вопросы
// Как пользователь узнает о своей ошибке ?



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
            min: 375,
            max: 750,
        },
        'Вес гр.': {
            required: true,
            type: 'number',
            validation: validateFloat,
            min: 0,
            max: 1000000,
        },
    },
    'Драгоценные камни': {
        'Вес в каратах': {
            required: true,
            type: 'number',
            validation: validateFloat,
            min: 0,
            max: 3106,
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
            step: 64,
            min: 0,
            max: 512,
        }
    },
    'Антиквариат': {},
    'Другое': {},
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







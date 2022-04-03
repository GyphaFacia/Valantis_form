// Разработать форму оценки
// Макет формы прилагается.

// Поля:
// Имя - обязательное
// email и телефон - одно из них обязательно к заполнению. К заполнению обязательно хотя бы одно.
// Тип изделия - Выпадающий список. Тип по умолчанию - Ювелирное изделие. Остальные типы: Драгоценные камни, Шубы, Техника Apple, Антиквариат, Другое
// Комментарий - текстовое поле. Присутствует во всех вариантах формы.


// Наборы полей:
// Ювелирное изделие:
// Металл - текстовое поле
// Проба - числовое поле
// Вес гр. - числовое поле допускающее десятичный разделитель


// Драгоценные камни:
// Вес в каратах - числовое поле допускающее десятичный разделитель
// Наличие документов - чекбокс. По умолчанию не выделен.

// Шубы:
// Вид меха - текстовое поле
// Состояние изделия - текстовое поле

// Техника Apple:
// Модель - текстовое поле
// Объем памяти - числовое поле

// Антиквариат:
// Дополнительные поля отсутствуют

// Другое:
// Дополнительные поля отсутствуют

// Во всех случаях так же присутствует поле для загрузки изображений. Изначально по центру поля расположена картинка "Загрузить фото". При клике на картинку открывается диалог выбора файла. После выбора в форме появляется перевью изображения. При наведении на изображение в его углу появляется крестик. При нажатии на крестик изображение удаляется из формы. Ограничение 9 картинок.

// Обязательные поля выделяются красной звездочкой

// Ввод электронной почты и телефона валидируются

const options = {
    'Ювелирное изделие': {
        'Металл': {
            type: 'text',
        },
        'Проба': {
            type: 'number',
        },
        'Вес гр.': {
            type: 'float',
        },
    },
    'Драгоценные камни': {
        'Вес в каратах': {
            type: 'float',
        },
        'Наличие документов':{
            type: 'checkbox',
            default: false,
        },
    },
    'Шубы': {
        'Вид меха': {
            type: 'text',
        },
        'Состояние изделия':{
            type: 'text',
        }
    },
    'Техника Apple': {
        'Модель': {
            type: 'text'
        },
        'Объем памяти': {
            type: 'number',
        }
    },
    'Антиквариат': {},
    'Другое': {},
}

const grid = document.querySelector('.eval-content-images-uploaded')

for (let i = 0; i < 9; i++) {
    grid.innerHTML += `
    <div class="eval-content-images-uploaded-image">
        <img src="./src/Images/Svg/placeholder.svg" alt="">
        <button class="eval-content-images-uploaded-image__closebtn red-button">
            <img src="./src/Images/Svg/X.svg">
        </button>
    </div>
    `
}

// вычислить размер плейсхолдера у инпута
function measurePlaceholderWidth(inputDom){
    const node = document.createElement('span')
    const textnode = document.createTextNode(
        inputDom.getAttribute('placeholder')
    )

    node.appendChild(textnode)
    document.body.appendChild(node)

    const style = getComputedStyle(inputDom)
    node.style.font = style.font
    node.style.padding = style.padding
    node.style.paddingRight = 0
    
    node.style.position = 'fixed'
    node.style.left = '-100vw'

    const {width} = node.getBoundingClientRect()
    document.body.removeChild(node)
    return width
}

// расположить звёздочку после плейсхолдера инпута
function placeAsteriskOnInput(inputDom){
    const width = measurePlaceholderWidth(inputDom)
    const parent = inputDom.parentNode
    const {height} = parent.getBoundingClientRect()
    
    const asterisk = document.createElement('span')
    const textnode = document.createTextNode('*')
    asterisk.appendChild(textnode)
    parent.appendChild(asterisk)

    const {style} = asterisk
    style.position = 'absolute'
    style.left = `${width + 5}px`
    style.top = `${height/4 - 5}px`
    style.fontSize = '20px'
    style.color = '#A52838'
    style.fontWeight = '900'

    inputDom.addEventListener('input', (e)=>{
        asterisk.style.display = !!e.target.value ? 'none' : 'block'
    })
}

// добавить ко всем обязательным инпутам звёздочку
function addAsterisksToRequiredInputs(){
    [...document.querySelectorAll('input[required]')].forEach(
        (e) => placeAsteriskOnInput(e)
    )
}

// добавить опции для выпадающего меню типа изделия
function constructDropMenu(dropdown, options){
    Object.keys(options).forEach(key => {
        const node = document.createElement('option')
        const textnode = document.createTextNode(key)
        node.appendChild(textnode)
        dropdown.appendChild(node)
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
    // console.log(dropdown.value)
    const inputs = options[dropdown.value]
    // console.log(inputs)
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

const dropdown = document.querySelector('select.form-input')
const inputsSection = document.querySelector('.eval-content-inputs-top')
addAsterisksToRequiredInputs()
constructDropMenu(dropdown, options)








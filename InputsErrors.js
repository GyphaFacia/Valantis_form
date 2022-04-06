function checkIsNotEmpty(str){
    return !!str
}

function checkIsNotZero(str){
    return Number(str) != 0
}

function checkIsFloat(str){
    return Number(str) == str
}

function checkIsPositive(str){
    return Number(str) > 0
}

// получить сообщение об ошибке в полях
// "Ювелирное изделие > Проба"
// "Драгоценные камни > Вес в каратах" 
function formWeightInputErrorMessage(inputElement){
    const {value} = inputElement

    if(!checkIsNotEmpty(value)){
        return 'Это поле необходимо заполнить'
    }
    if(!checkIsFloat(value)){
        return 'Вес должен быть указан в виде дробного числа'
    }
    if(!checkIsNotZero(value)){
        return 'Вес не может быть нулевым'
    }
    if(!checkIsPositive(value)){
        return 'Вес не может быть отрицательным'
    }
    return ''
}


// https://qna.habr.com/q/84360
function isPhoneNumber(str){
    const phoneRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
    
    return phoneRegExp.test(str)
}

function formPhoneInputErrorMessage(inputElement){
    const {value} = inputElement

    if(!isPhoneNumber(value)){
        return 'Телефон указан неверно'
    }

    return ''
}


function formNoContactsErrorMessage(phone, mail){
    if(!(phone || mail)){
        return 'Вы не ввели номер телефона или адрес электронной почты для обратной связи'
    }
    return ''
}
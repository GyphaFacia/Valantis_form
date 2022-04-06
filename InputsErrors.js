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

    console.log(value)
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


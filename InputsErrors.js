function checkIsNotEmpty(str) {
    return !!str
}

function checkIsNotZero(str) {
    return parseFloat(str) !== 0
}

// isFloatPoint - является ли мантиссой
function isFloatPoint(str) {
    return str.toLowerCase().includes('e')
}

function checkIsNumber(str) {
    return !isNaN(Number(str))
}

function checkIsPositive(str) {
    return parseFloat(str) > 0
}

// получить сообщение об ошибке в полях
// "Ювелирное изделие > Вес в гр."
// "Драгоценные камни > Вес в каратах"
function formWeightInputErrorMessage(inputElement) {
    const { value } = inputElement

    if (!checkIsNotEmpty(value)) {
        return 'Это поле необходимо заполнить'
    }
    if (!checkIsNumber(value)) {
        return 'Вес должен быть указан в виде целого или дробного числа'
    }
    if (isFloatPoint(value)) {
        return 'Запись веса с использованием мантиссы не допустима'
    }
    if (!checkIsNotZero(value)) {
        return 'Вес не может быть нулевым'
    }
    if (!checkIsPositive(value)) {
        return 'Вес не может быть отрицательным'
    }
    return ''
}

// https://qna.habr.com/q/84360
function isPhoneNumber(str) {
    const phoneRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/

    return phoneRegExp.test(str)
}

function formPhoneInputErrorMessage(inputElement) {
    const { value } = inputElement

    if (!isPhoneNumber(value)) {
        return 'Телефон указан неверно'
    }
    return ''
}

function formNoContactsErrorMessage(phone, mail) {
    if (!(phone || mail)) {
        return 'Вы не ввели номер телефона или адрес электронной почты для обратной связи'
    }
    return ''
}

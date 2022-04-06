function applyNumericInputsRestrictions(inputElement, inputType){
    if(inputType.includes('float')){
        applyFloatInputRestrictions(inputElement)
    }
    if(inputType == 'number'){
        applyNumberInputRestrictions(inputElement)
    }
}

// целочисленным инпутам запрещаем быть ниже нуля и быть дробными
function applyNumberInputRestrictions(inputElement){
    inputElement.setAttribute('min', '0')
    inputElement.setAttribute('step', '1')
}

// дробным инпутам выключаем подсказки и убираем все лишние символы
// пользователь всё ещё в своём праве напечатать "+2-1.e.3"
function applyFloatInputRestrictions(inputElement){
    inputElement.setAttribute('autocomplete', 'new-password')

    inputElement.oninput = ({target})=>{
        const newValue = target.value
        const oldValue = target.getAttribute('old-value') ?? ''
        
        if(leaveOnlyAllowedFloatChars(newValue) !== newValue){
            target.value = oldValue
        }
        else{
            target.setAttribute('old-value', newValue)
        }
    }
}

function leaveOnlyAllowedFloatChars(str){
    return str
           .split('')
           .filter(char => ALLOWED_NUMERIC_CHARS.includes(char))
           .join('')
}
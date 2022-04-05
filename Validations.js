function validateName(str){
    const alphabet = []
    
    if(!str){return 'Поле с именем должно быть заполнено'}

    return str === str.split('').filter(
        c => ' _'.includes(c) || 
        (c>='а' && c<='я') ||
        (c>='А' && c<='Я') ||
        (c>='a' && c<='z') ||
        (c>='A' && c<='Z') ||
        (c>='0' && c<='9')
    ).join('') ? false : 
    'В имени допускаются буквы русского или латинского алфавита и цифры'
}

function validateMail(str){
    return !!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str) ? 
    false : 'Введён неверный адрес электронной почты'
}

function validatePhone(str){
    str = str.replaceAll('-', '')
    str = str.replaceAll(' ', '')
    return !! /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(str) ?
    false : 'Введён неверный номер телефона'
}

function validateInt(str){
    try {
        return String(parseInt(str)) === str
    } catch (error) {
        return false
    }
}

function validateFloat(e){
    const {target} = e
    let {value} = target
    
    value = value.split('').filter(
        c => '1234567890.'.includes(c)
    ).join('')


    if(value.split('').filter(c => c=='.').length > 1){
        value = value.split('.').slice(0, 2).join('.')
    }

    e.target.value = value
}







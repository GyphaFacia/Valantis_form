function validateName(str){
    const alphabet = []
    
    return str === str.split('').filter(
        c => ' _'.includes(c) || 
        (c>='а' && c<='я') ||
        (c>='А' && c<='Я') ||
        (c>='a' && c<='z') ||
        (c>='A' && c<='Z') ||
        (c>='0' && c<='9')
    ).join('')
}

function validateMail(str){
    return !!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)
}

function validatePhone(str){
    str = str.replaceAll('-', '')
    str = str.replaceAll(' ', '')
    return !! /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(str)
}

function validateInt(str){
    try {
        return String(parseInt(str)) === str
    } catch (error) {
        return false
    }
}

function validateFloat(str){
    try {
        return String(Number(str)) === str
    } catch (error) {
        return false
    }
}








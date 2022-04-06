// каждому состоянию выпадающего списка
// типов изделий соответствуют инпуты
// их тип и обязательность заполнения перечислены ниже
const EVAL_OPTIONS = {
    'Ювелирное изделие': {
        'Металл': {
            required: true,
            type: 'text',
        },
        'Проба': {
            required: true,
            type: 'number',
        },
        'Вес гр.': {
            required: true,
            type: 'text-float',
            formErrorMessage : formWeightInputErrorMessage,
        },
    },
    'Драгоценные камни': {
        'Вес в каратах': {
            required: true,
            type: 'text-float',
            formErrorMessage : formWeightInputErrorMessage,
        },
        'Наличие документов':{
            type: 'checkbox',
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
        }
    },
    'Антиквариат': {},
    'Другое': {},
}

const DEFAULT_INPUTS = {
    'Имя пользователя': {
    },
    'Телефон': {
        formErrorMessage: formPhoneInputErrorMessage,
    },
    'Электронная почта': {
    },
}


const PHOTOS_ALLOWED_EXTENSIONS = [
    'png',
    'jpg',
    'jpeg',
]
const PHOTO_MAX_SIZE = 8 * 1024 * 1024
const PHOTOS_MAX_COUNT = 9

const ALLOWED_NUMERIC_CHARS = '+-1234567890.e'.split('')
const ALLOWED_PHONE_CHARS = '+-1234567890()'.split('')
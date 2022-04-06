function photoSizeCheck(photo){
    return photo.size <= PHOTO_MAX_SIZE
}

function photoExtensionCheck(photo){
    const photoExtension = photo.name.split('.').pop()
    return PHOTOS_ALLOWED_EXTENSIONS.includes(photoExtension)
}

function photosCountCheck(photos){
    return photos.length < PHOTOS_MAX_COUNT
}

function photoIsUnique(photo, photos){
    return !photos.filter(
        curPhoto => curPhoto.name == photo.name
    ).length
}

function genPhotoUploadError(errorMessage, errorCode){
    alert(errorMessage)
}

function isValidPhoto(photo){
    if(!photoSizeCheck(photo)){
        genPhotoUploadError(`Файл "${photo.name}" слишком большой. Допустимый размер - до ${PHOTO_MAX_SIZE} мегабайт`)
        return false
    }

    if(!photoExtensionCheck(photo)){
        genPhotoUploadError(`Файл имеет недопустимое расширение. Принимаются фото форматов ${PHOTOS_ALLOWED_EXTENSIONS.join(', ')}`)
        return false
    }

    if(!photosCountCheck(photos)){
        genPhotoUploadError(`Вы не можете прикрепить более ${PHOTOS_MAX_COUNT} фотографий`)
        return false
    }

    if(!photoIsUnique(photo, photos)){
        genPhotoUploadError(`Вы уже добавили файл ${photo.name}`)
        return false
    }

    return true
}
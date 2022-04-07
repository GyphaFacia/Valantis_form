function isPhotoSizeBiggerThanPhotoMaxSize(photo){
    return photo.size > PHOTO_MAX_SIZE
}

function hasPhotoFileWrongExtension(photo){
    const photoExtension = photo.name.split('.').pop()
    return !PHOTOS_ALLOWED_EXTENSIONS.includes(photoExtension)
}

function isPhotosCountMoreThanMaxCount(photos){
    return photos.length > PHOTOS_MAX_COUNT
}

function isPhotoDuplicate(photo, photos){
    for(let i = 0; i < photos.length; i++){
        if(photos[i].name === photo.name){
            return true
        }
    }
    return false
}

function throwPhotoUploadError(errorMessage){
    createNotification(errorMessage)
}

function isPhotoFileCorrect(photo){
    if(isPhotoSizeBiggerThanPhotoMaxSize(photo)){
        throwPhotoUploadError(`Файл "${photo.name}" слишком большой. 
        Допустимый размер - до ${PHOTO_MAX_SIZE} мегабайт`)
        return false
    }

    if(hasPhotoFileWrongExtension(photo)){
        throwPhotoUploadError(`Файл имеет недопустимое расширение. 
        Принимаются фото форматов ${PHOTOS_ALLOWED_EXTENSIONS.join(', ')}`)
        return false
    }

    if(isPhotosCountMoreThanMaxCount(photos)){
        throwPhotoUploadError(`Вы не можете прикрепить более ${PHOTOS_MAX_COUNT} фотографий`)
        return false
    }

    if(isPhotoDuplicate(photo, photos)){
        throwPhotoUploadError(`Вы уже добавили файл ${photo.name}`)
        return false
    }

    return true
}
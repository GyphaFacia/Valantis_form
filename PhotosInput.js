photosSection.createChild = createChild
fileInput.oninput = handleFileInput
let photos = []

function handleFileInput(e){
    e.preventDefault()

    const files = [...fileInput.files]
    files.forEach(photo => {
        if(isValidPhoto(photo)){
            addPhoto(photo)
        }
    })
}

function addPhoto(photo){
    const photoWrapper = photosSection.createChild({
        tagName: 'div',
        className: 'eval-content-images-image',
    })

    photoWrapper.createChild = createChild
    const photoElement = photoWrapper.createChild({
        tagName: 'img',
        src: window.URL.createObjectURL(photo)
    })

    const closeButton = photoWrapper.createChild({
        tagName: 'button',
        className: 'eval-content-images-image__closebtn red-button',
    })

    closeButton.createChild = createChild
    const cross = closeButton.createChild({
        tagName: 'img',
        src: './src/Images/Svg/X.svg'
    })

    closeButton.onclick = (e)=>{
        removePhoto(photo)
        e.stopPropagation()
    }

    photos.push({
        name: photo.name,
        dom: photoWrapper,
        file: photo,
    })

    handlePhotosCountChange()
}

function removePhoto(photo){
    photos = photos.filter(currentPhoto => {
        if(currentPhoto.name == photo.name){
            const {dom} = currentPhoto
            dom.parentNode.removeChild(dom)
            return false
        }
        return true
    })

    handlePhotosCountChange()
}

// показывать ли подсказку "перетащите файлы сюда"
// или некоторое кол-во файлов уже добавлено
// и мы показываем "плюс"-кнопку для добавления новых в список
function updatePhotosSectionStyle(){
    if(photos.length){
        plusButton.style.display = 'flex'
        blankSection.style.display = 'none'
        photosSection.parentElement.style.border = 'none'
    }
    else{
        blankSection.style.display = 'flex'
        plusButton.style.display = 'none'
        photosSection.parentElement.style.border = ''
    }
}

function handlePhotosCountChange(){
    const dt = new DataTransfer()
    photos.forEach(
        obj => dt.items.add(obj.file)
    )
    fileInput.files = dt.files

    updatePhotosSectionStyle()
}

updatePhotosSectionStyle()
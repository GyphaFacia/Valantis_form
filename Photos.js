const fileInput = document.querySelector('form#eval-form input[type="file"]')
const photosSection = document.querySelector('.eval-content-images')
const blankSection = document.querySelector('.eval-content-images-blank')
const plusButton = document.querySelector('.eval-content-images-plusbtn')
photosSection.createChild = createChild
let photos = []
fileInput.oninput = handleInput



function handleInput(e){
    const files = [...fileInput.files]

    files.forEach(photo => {
        if(validateImage(photo)){
            addImage(photo)
        }
    })
}

function validateImage(file, maxMegaBytes = 8, allowedExts = 'png jpg jpeg'.split(' ')){
    const megaBytes = file.size / 1024 / 1024
    if(megaBytes > maxMegaBytes){
        alert(`Файл "${file.name}" слишком большой. Допустимый размер - до ${maxMegaBytes} мегабайт`)
        return false
    }
    if(!allowedExts.includes(file.name.split('.').pop())){
        alert(`Файл имеет недопустимое расширение. Принимаются фото форматов ${allowedExts.join(' ')}`)
        return false
    }

    for(let i = 0; i < photos.length; i++){
        if(photos[i].name == file.name){
            alert(`Вы уже добавили файл с названием ${file.name}`)
            return false
        }
    }

    return true
}

function addImage(file){
    const frame = photosSection.createChild({
        tagName: 'div',
        className: 'eval-content-images-image',
    })

    frame.createChild = createChild
    const img = frame.createChild({
        tagName: 'img',
        src: window.URL.createObjectURL(file)
    })

    const closebtn = frame.createChild({
        tagName: 'button',
        className: 'eval-content-images-image__closebtn red-button',
    })

    closebtn.createChild = createChild
    const cross = closebtn.createChild({
        tagName: 'img',
        src: './src/Images/Svg/X.svg'
    })

    closebtn.onclick = ()=>{removeImage(file)}

    photos.push({
        name: file.name,
        dom: frame,
        file,
    })
    handlePhotosCntChange()
}

function removeImage(file){
    for(let i = 0; i < photos.length; i++){
        const cur = photos[i]
        if(cur.name === file.name){
            setTimeout(()=>{
                cur.dom.parentNode.removeChild(cur.dom)
            }, 0)
        }
    }
    photos = photos.filter(
        cur => cur.name !== file.name
    )
    handlePhotosCntChange()
}

function handlePhotosCntChange(){
    if(photos.length){
        plusButton.style.display = 'flex'
        blankSection.style.display = 'none'
        photosSection.style.border = 'none'
        return null
    }
    blankSection.style.display = 'flex'
    plusButton.style.display = 'none'
    photosSection.style.border = ''
}
handlePhotosCntChange()
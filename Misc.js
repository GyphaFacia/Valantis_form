// todo : notAttributes - убрать отрицание
// todo : у textArea исчез placeholder
// todo : ()_{
function createChild(options){
    const notAttributes = `className text tagName`.split(' ')
    const node = document.createElement(options.tagName ?? 'div')

    if(options.className){
        node.className = options.className
    }
    if(options.text){
        const textNode = document.createTextNode(options.text)
        node.appendChild(textNode)
    }

    Object.keys(options).filter(
        key => ! notAttributes.includes(key)
    ).forEach(
        key => node.setAttribute(key, options[key])
    )

    this.appendChild(node)
    return node
}

let isTabletLayout = false
function handleLayoutChange(){
    const mediaQueryMatches = matchMedia('(max-width: 1000px)').matches
    if(mediaQueryMatches === isTabletLayout){
        return ;
    }
    isTabletLayout = mediaQueryMatches

    const imagesWrapper = document.querySelector('.eval-content-images-wrapper')
    if(isTabletLayout){
        const evalContentInputs = document.querySelector('.eval-content-inputs')
        const before = evalContentInputs.children[2]
        imagesWrapper.parentElement.removeChild(imagesWrapper)
        evalContentInputs.insertBefore(imagesWrapper, before)
    }
    else {
        const evalForm = document.querySelector('.eval-content')
        imagesWrapper.parentElement.removeChild(imagesWrapper)
        evalForm.appendChild(imagesWrapper)
    }
}
window.onresize = handleLayoutChange
window.onload = handleLayoutChange
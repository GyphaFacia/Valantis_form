function createChild(options){
    const notAttributes = `className text tagName`.split(' ')
    const node = document.createElement(options.tagName ?? 'div')

    if(options.className){
        node.className = options.className
    }
    if(options.text){
        const textnode = document.createTextNode(options.text)
        node.appendChild(textnode)
    }

    Object.keys(options).filter(
        key => !notAttributes.includes(key)
    ).forEach(
        key => node.setAttribute(key, options[key])
    )

    this.appendChild(node)
    return node
}

let mobile = false
function handleLayoutChange(){
    const {matches} = matchMedia('(max-width: 1000px)')
    if(matches === mobile){return null}
    mobile = matches
    
    const imagesWrapper = document.querySelector('.eval-content-images-wrapper')
    if(!mobile){
        imagesWrapper.parentElement.removeChild(imagesWrapper)
        evalForm.appendChild(imagesWrapper)
    }
    else{
        const before = evalContentInputs.children[2]
        imagesWrapper.parentElement.removeChild(imagesWrapper)
        evalContentInputs.insertBefore(imagesWrapper, before)
    }
}
window.onresize = handleLayoutChange
window.onload = handleLayoutChange
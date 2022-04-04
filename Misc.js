function createChild(ops){
    const notAttributes = `className text tagName`.split(' ')
    const node = document.createElement(ops.tagName ?? 'div')

    if(ops.className){
        node.className = ops.className
    }
    if(ops.text){
        const textnode = document.createTextNode(ops.text)
        node.appendChild(textnode)
    }

    const filtered = Object.keys(ops).filter(
        key => !notAttributes.includes(key)
    ).forEach(
        key => node.setAttribute(key, ops[key])
    )

    this.appendChild(node)
    return node
}

let mobile = false
function handleMobile(){
    const {matches} = matchMedia('(max-width: 1000px)')
    if(matches === mobile){return null}
    mobile = matches
    const imgs = document.querySelector('aside.eval-content-images')
    if(!mobile){
        const newParent = document.querySelector('.eval-content')
        imgs.parentElement.removeChild(imgs)
        newParent.appendChild(imgs)
    }
    else{
        const newParent = document.querySelector('.eval-content-inputs')
        const before = newParent.children[2]
        imgs.parentElement.removeChild(imgs)
        newParent.insertBefore(imgs, before)
    }
}
window.onresize = handleMobile
window.onload = handleMobile
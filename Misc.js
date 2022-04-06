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
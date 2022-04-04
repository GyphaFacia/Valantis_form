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

const grid = document.querySelector('.eval-content-images-uploaded')

for (let i = 0; i < 9; i++) {
    grid.innerHTML += `
    <div class="eval-content-images-uploaded-image">
        <img src="./src/Images/Svg/placeholder.svg" alt="">
        <button class="eval-content-images-uploaded-image__closebtn red-button">
            <img src="./src/Images/Svg/X.svg">
        </button>
    </div>
    `
}
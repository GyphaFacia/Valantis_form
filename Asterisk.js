// вычислить размер плейсхолдера у инпута
function measurePlaceholderWidth(inputDom){
    document.body.createChild = createChild
    const node = document.body.createChild({
        tagName: 'span',
        text: inputDom.getAttribute('placeholder'),
    })

    const style = getComputedStyle(inputDom)
    node.style.font = style.font
    node.style.padding = style.padding
    node.style.paddingRight = 0
    
    node.style.position = 'fixed'
    node.style.left = '-100vw'

    const {width} = node.getBoundingClientRect()
    document.body.removeChild(node)
    return width
}

// расположить звёздочку после плейсхолдера инпута
function placeAsteriskOnInput(inputDom){
    const width = measurePlaceholderWidth(inputDom)
    const parent = inputDom.parentNode
    const {height} = parent.getBoundingClientRect()
    
    const asterisk = document.createElement('span')
    const textnode = document.createTextNode('*')
    asterisk.appendChild(textnode)
    parent.appendChild(asterisk)

    const {style} = asterisk
    style.position = 'absolute'
    style.left = `${width + 5}px`
    style.top = `${height/4 - 5}px`
    style.fontSize = '20px'
    style.color = '#A52838'
    style.fontWeight = '900'

    inputDom.addEventListener('input', (e)=>{
        asterisk.style.display = !!e.target.value ? 'none' : 'block'
    })
}

// добавить ко всем обязательным инпутам звёздочку
function addAsterisksToRequiredInputs(){
    [...document.querySelectorAll('input[required]')].forEach(
        (e) => placeAsteriskOnInput(e)
    )
}
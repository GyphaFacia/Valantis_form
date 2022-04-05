// // вычислить размер плейсхолдера у инпута
// function measurePlaceholderWidth(inputDom){
//     document.body.createChild = createChild
//     const node = document.body.createChild({
//         tagName: 'span',
//         text: inputDom.getAttribute('placeholder'),
//     })

//     const style = getComputedStyle(inputDom)
//     node.style.font = style.font
//     node.style.padding = style.padding
//     node.style.paddingRight = 0
    
//     node.style.position = 'fixed'
//     node.style.left = '-100vw'

//     const {width} = node.getBoundingClientRect()
//     document.body.removeChild(node)
//     return width
// }

// // расположить звёздочку после плейсхолдера инпута
// function placeAsteriskOnInput(inputDom){
//     const width = measurePlaceholderWidth(inputDom)
//     const parent = inputDom.parentNode
//     const {height} = parent.getBoundingClientRect()
    
//     if(parent.children[1] && parent.children[1].className == 'asterisk'){
//         return null
//     }

//     parent.createChild = createChild
//     const asterisk = parent.createChild({
//         tagName: 'span',
//         className: 'asterisk',
//         text: '*'
//     })

//     const {style} = asterisk
    
//     style.left = `${width + 5}px`
//     style.top = `${height/4 - 5}px`    

//     inputDom.addEventListener('input', (e)=>{
//         asterisk.style.display = !!String(e.target.value) ? 'none' : 'block'
//     })
// }

// // добавить ко всем обязательным инпутам звёздочку
// function addAsterisksToRequiredInputs(){
//     [...document.querySelectorAll('input[required]')].forEach(
//         (e) => placeAsteriskOnInput(e)
//     )
// }

// addAsterisksToRequiredInputs()

function addAsterisksToRequiredInputs(){
    [...document.querySelectorAll('input')].forEach(
        input => {
            if('checkbox'.split(' ').includes(input.type)){ return null }
            if(input.parentElement.children[1]){ return null }
            input.parentElement.createChild = createChild
            const placeholder = input.parentElement.createChild({
                tagName: 'span',
                text: input.getAttribute('placeholder'),
                class: 'placeholder',
            })
            if(input.getAttribute('required')){
                placeholder.classList.add('placeholder--important')
            }
            input.onfocus = ()=>{
                placeholder.style.opacity = 0
            }
            input.onblur = ()=>{
                if(input.value){return null}
                placeholder.style.opacity = 1
            }
        }
    )
}

addAsterisksToRequiredInputs()

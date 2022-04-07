function createNotification(notificationText, lifeTime = NOTIFICATION_LIFETIME){
    const notificationsSection = document.querySelector('.notifications')

    notificationsSection.createChild = createChild
    const notificationWrapper = notificationsSection.createChild({
        className: 'notification-wrapper notification-wrapper--fade-out',
    })
    notificationWrapper.createChild = createChild

    const notificationContent = notificationWrapper.createChild({
        className: 'notification__content',
        text: notificationText,
    })

    const notificationCloseButton = notificationWrapper.createChild({
        tagName: 'button',
        className: 'notification__closebtn',
        text: '×',
    })

    notificationCloseButton.onclick = ()=>{
        activateNotificationFadeOutState(notificationWrapper, 0)
    }

    handleNotificationVisualEffects(notificationWrapper, lifeTime)
}

function handleNotificationVisualEffects(notificationElement, lifeTime){
    activateNotificationFadeInState(notificationElement)
    activateNotificationFadeOutState(notificationElement, lifeTime)
}

function activateNotificationFadeInState(notificationElement){
    let {transitionDuration} = getComputedStyle(notificationElement)
    transitionDuration = parseFloat(transitionDuration) * 1000

    setTimeout(() => {
        notificationElement.classList.remove('notification-wrapper--fade-out')
        notificationElement.classList.add('notification-wrapper--fade-in')
    }, 0)
}

function activateNotificationFadeOutState(notificationElement, lifeTime){
    let {transitionDuration} = getComputedStyle(notificationElement)
    transitionDuration = parseFloat(transitionDuration) * 1000

    setTimeout(() => {
        notificationElement.classList.add('notification-wrapper--fade-out')
        notificationElement.classList.remove('notification-wrapper--fade-in')
    }, lifeTime)

    setTimeout(()=>{
        deleteNotification(notificationElement)
    }, lifeTime + transitionDuration)
}


function deleteNotification(notificationElement){
    const notificationsSection = document.querySelector('.notifications')
    if(notificationElement.parentElement === notificationsSection){
        notificationsSection.removeChild(notificationElement)
    }
}

import React from 'react'

const Notification = ({ cssClass, message }) => {
    if(message === null) {
        return null
    }

    return (
        <div className={cssClass}>
            {message}
        </div>
    )
}

export default Notification
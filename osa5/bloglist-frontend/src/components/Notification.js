import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ cssClass, message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={cssClass}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  cssClass: PropTypes.string.isRequired,
}

export default Notification
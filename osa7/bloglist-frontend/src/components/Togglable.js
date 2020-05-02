import React, { useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { changeVisibility } from '../reducers/togglableReducer'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const visibility = useSelector(state => state.visibility)

  const hideWhenVisible = { display: visibility ? 'none' : '' }
  const showWhenVisible = { display: visibility ? '' : 'none' }

  const toggleVisibility = () => {
    dispatch(changeVisibility(!visibility))
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant='contained'
          color='primary'
          onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant='contained'
          size='small'
          color='secondary'
          onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
import { useState, forwardRef, useImperativeHandle } from 'react'

// eslint-disable-next-line react/display-name
const ToggleButton = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <button className={'btn btn-primary btn-sm'} onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button
          className={'btn btn-outline-secondary btn-sm mb-2'}
          onClick={toggleVisibility}
        >
          {'cancel'}
        </button>
      </div>
    </>
  )
})

export default ToggleButton

import React from 'react'

function Button({type, value, handleClick, className}) {
  return (
    <button className={className} onClick={() => handleClick(type, value)}>
        {value}
    </button>
  )
}

export default Button;
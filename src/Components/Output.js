import React from 'react'

function Output({value}) {
  return (
    <div className="output">
        <p>{value || 0}</p>
    </div>
  )
}

export default Output;
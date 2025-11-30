import React from 'react'

const Bugs = () => {
  return (
    <div>
      <button onClick={() => {localStorage.clear()}}>
        Clear LS
      </button>
    </div>
  )
}

export default Bugs
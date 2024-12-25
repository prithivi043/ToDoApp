import React from 'react'
const Footer = ({ Length }) => {
  return (
    <div>
      <footer >
        <h1 className='fh2'>{Length} list {Length === 1 ? 'item' : 'items'}</h1>
      </footer>

    </div>
  )
}

export default Footer
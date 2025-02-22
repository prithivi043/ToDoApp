import React from 'react'

const Lineitem = ({ item, handlecheck, handledelete }) => {
  return (
    <li className='items'>
      <input type="checkbox"
        checked={item.complete}
        onChange={() => handlecheck(item.id)} />
      <label style={(item.complete) ? { textDecoration: 'line-through' } : null}>{item.task}</label>
      <FaTrashAlt
        role="button"
        tabIndex='0'
        onClick={() => handledelete(item.id)}
      />

    </li>
  )
}

export default Lineitem
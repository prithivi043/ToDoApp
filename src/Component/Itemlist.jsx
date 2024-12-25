import React from 'react'
import { FaTrashAlt } from "react-icons/fa";
const Itemlist = ({ handlecheck, handledelete, item }) => {
  return (

    <li className='items' key={item.id}>
      <input type="checkbox"
        checked={item.complete}
        onChange={() => handlecheck(item.id)} />
      <label style={(item.complete) ? { textDecoration: 'line-through' } : { color: 'black' }}>{item.task}</label>
      <FaTrashAlt
        role="button"
        tabIndex='0'
        onClick={() => handledelete(item.id)}
      />

    </li>
  )
}

export default Itemlist
import React from 'react'
import { FaPlus } from "react-icons/fa";
import './Content.css';
import Itemlist from './Itemlist';
import { FaSearch } from 'react-icons/fa';
const Content = ({ list, task, handlecheck, handledelete, handleinput, addTask, search, setSearch }) => {

  return (
    <div >
      <div className="todoInput">
        <input type="text"
          value={task}
          onChange={handleinput}
          placeholder='Enter Task' />
        <button onClick={addTask}><FaPlus /></button>
      </div>
      <div className="todoSearch">
        <input className='todoSearch' type="text"
          placeholder='Search Item'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div>
          < FaSearch />
        </div>
      </div>
      {list.length ? (
        <ul>
          {list.filter((item) => (item.task).includes(search.toLowerCase())).map((item) => (
            <Itemlist
              handlecheck={handlecheck}
              handledelete={handledelete}
              item={item} starnp
              key={item.id}
            />
          ))}
        </ul>
      ) : (
        <p style={{ fontSize: '25px', textAlign: 'center', position: 'relative', top: '50px' }}>Your Task is Empty</p>
      )
      }
    </div >
  )
}

export default Content
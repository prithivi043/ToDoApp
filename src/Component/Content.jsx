import React from 'react'
import { FaPlus } from "react-icons/fa";
import './Content.css';
import Itemlist from './Itemlist';
import { FaSearch } from 'react-icons/fa';
const Content = ({ list, task, handlecheck, handledelete, handleinput, addTask, search, setSearch }) => {
  const todosearch = {
    height: '30px'
  }
  return (
    <div >
      <div className="todoinput">
        <input type="text"
          value={task}
          onChange={handleinput}
          placeholder='Enter Task' />
        <button onClick={addTask}><FaPlus /></button>
      </div>
      <div className="todosearch">
        <input className='todosearch' type="text"
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
          {list.filter(item => (item.task).includes(search.toLowerCase())).map((item) => (
            <Itemlist
              handlecheck={handlecheck}
              handledelete={handledelete}
              item={item}
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
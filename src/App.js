import Content from './Component/Content';
import Footer from './Component/Footer';
import Header from './Component/Header';
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'


function App() {
  const [list, setlist] = useState([])
  const [task, setTask] = useState('')
  const [search, setSearch] = useState('')

  const handlecheck = (id) => {
    const newcheck = list.map((item) => (item.id === id) ? { ...item, complete: !item.complete } : item)
    setlist(newcheck)
    localStorage.setItem("listItem", JSON.stringify(newcheck))
  }
  const handledelete = (id) => {
    const deletelist = list.filter((item) => (item.id !== id))
    setlist(deletelist)
    localStorage.setItem("deleteItem", JSON.stringify(deletelist))
  }
  const handleinput = (e) => {
    setTask(e.target.value);
    localStorage.setItem("inputitem", JSON.stringify(task))
  }
  const addTask = () => {
    if (task !== '')
      setlist([...list, { id: uuidv4(), task: task, complete: false }])
    setTask('')
    localStorage.setItem("addItem", JSON.stringify(list))
  }



  return (
    <div className="App">
      <Header />
      <Content
        list={list}
        task={task}
        handlecheck={handlecheck}
        handledelete={handledelete}
        handleinput={handleinput}
        addTask={addTask}
        search={search}
        setSearch={setSearch}
      />
      <Footer
        Length={list.length} />

    </div>
  );
}

export default App;

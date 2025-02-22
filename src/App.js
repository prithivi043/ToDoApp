import Content from './Component/Content';
import Footer from './Component/Footer';
import Header from './Component/Header';
import { useState } from 'react'
// import { v4 as uuidv4 } from 'uuid'
import { useEffect } from 'react';
import ApiRequest from './Component/ApiRequest';
let initialId = 0;
function App() {
  const API_URL = 'http://localhost:3200/items';
  const [list, setList] = useState([])
  const [task, setTask] = useState('')
  const [search, setSearch] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [IsLoading, setIsLoading] = useState(true)
  const [taskId, setTaskId] = useState(initialId);
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw Error("Data doesnot get")
        const listItems = await response.json()

        setList(listItems)
        setFetchError(null)
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    setTimeout(() => {
      (async () => await fetchItem())()
    }, 2000)
  }, [])
  const handlecheck = async (id) => {
    const newCheck = list.map((item) => (item.id === id) ? { ...item, complete: !item.complete } : item)
    setList(newCheck)

    const myItem = newCheck.filter((item) => item.id === id)
    const patchOpt = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ complete: myItem[0].complete }), // Send the new task data
    };

    const newReq = `${API_URL}/${id}`;
    // try {
    const result = await ApiRequest(newReq, patchOpt);

    if (result) setFetchError(result)

  }
  const handledelete = async (id) => {
    const deletelist = list.filter((item) => (item.id !== id))
    setList(deletelist)

    const deleteOpt = {
      method: 'DELETE'
    }
    const newReq = `${API_URL}/${id}`;
    // try {
    const result = await ApiRequest(newReq, deleteOpt);

    if (result) setFetchError(result)

  }

  const handleinput = (e) => {
    setTask(e.target.value);
  }



  // State for task ID

  const addTask = async () => {
    if (task !== '') {
      // Increment ID counter
      const newId = taskId + 1;
      setTaskId(newId);

      // Create the new task object
      const newTask = {
        id: `task-${newId}`,
        complete: false,
        task: task,
      };

      // Add the new task to the list in the frontend
      setList([...list, newTask]);
      setTask(''); // Clear the input field

      // Configure the POST request options
      const PostOpt = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask), // Send the new task data
      };

      try {
        const result = await ApiRequest(API_URL, PostOpt); // Send POST request
        if (result && result.error) {
          console.error('Error adding task:', result.error);
          setFetchError(result.error); // Update error state if needed
        } else {
          console.log('Task added successfully');
        }
      } catch (error) {
        console.error('Error:', error);
        setFetchError(error.message); // Handle fetch error
      }
    }
  };




  return (
    <div className="App">
      <Header />

      <main>
        {IsLoading && <p>Loading...</p>}
        {fetchError && <p>{`Error:${fetchError}`}</p>}
        {!IsLoading && !fetchError && <Content
          list={list}
          task={task}
          handlecheck={handlecheck}
          handledelete={handledelete}
          handleinput={handleinput}
          addTask={addTask}
          search={search}
          setSearch={setSearch}
        />}
      </main>
      <Footer
        Length={list.length} />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react'
import "./App.css"

function App() {
  const [data, setData] = useState([])

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("Not Started")
  const [deadline, setDeadline] = useState("")

  const [open, setOpen] = useState(false)

  const getData = () => {
    fetch("https://todopage.pythonanywhere.com/todos/")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err))
  }

  const delet = (id) => {
    fetch(`https://todopage.pythonanywhere.com/todo/${id}/`, {
      method: "DELETE"
    })
      .then(() => {
        getData()
      })
      .catch((error) => console.error(error));
  }

  const addTodo = () => {
    fetch("https://todopage.pythonanywhere.com/todo/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        status,
        deadline
      })
    })
      .then((res) => res.json())
      .then(() => {
        getData()
        setOpen(false)
        setTitle("")
        setDescription("")
        setStatus("Not Started")
        setDeadline("")
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="app">
      <div className="container">
        <nav>
          <h2>Vazifalar ro'yxati</h2>
          <button onClick={() => setOpen(true)}>Yangi vazifa</button>
        </nav>
      </div>

      {open && (
        <div className="modal-overlay">
          <form
            className="modal"
            onSubmit={(e) => {
              e.preventDefault()
              addTodo()
            }}
          >
            <div className="modal-header">
              <h2>Yangi vazifa</h2>
              <span onClick={() => setOpen(false)}>✖</span>
            </div>

            <input
              type="text"
              placeholder="Sarlavha"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Tavsif"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Not Started">Boshlanmagan</option>
              <option value="In Progress">Bajarilmoqda</option>
              <option value="Completed">Tugallangan</option>
            </select>

            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />

            <div className="modal-buttons">
              <button type="button" onClick={() => setOpen(false)}>
                Bekor qilish
              </button>
              <button type="submit">
                Qo'shish
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="container">
        <div className="flex">
          {data.map((item) => (
            <div className="card" key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="f">
                <span>{item.deadline}</span>
                <button onClick={() => delet(item.id)} className="delete">
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
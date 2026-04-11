import React, { useEffect, useState } from 'react'
import { MdOutlineDarkMode } from 'react-icons/md';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  const [data, setData] = useState([])
  const getData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("https://todopage.pythonanywhere.com/todos/", requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error(error));

  }

  useEffect(() => { getData() }, [])
  return (
    <div className='app'>
      <div className="container">
        <nav>
          <div className="logo">
            <h2>
              Vazifalar ro'yxati
            </h2>
          </div>

         

        </nav>
      </div>

      <div className="container">
        <div className="flex">
          {
            data.map((item) => {
              return (
                <div className="card" >
                  <div className="card-header">
                    <h3>{item?.title}</h3>
                    <span className="status">{item?.status}</span>
                  </div>

                  <p className="desc">{item?.description}</p>

                  <div className="date">
                    <span>{item?.start_date}</span>
                    <span>{item?.end_date}</span>
                  </div>

                  <div className="actions">
                    <button className="edit">Tahrirlash</button>
                    <button className="delete">O'chirish</button>
                  </div>
                </div>
              )
            })
          }




        </div>
      </div>

    </div>
  )
}

export default App
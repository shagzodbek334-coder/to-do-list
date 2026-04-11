import React, { useEffect, useState } from 'react'
import { MdOutlineDarkMode } from 'react-icons/md';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  const [data, setData] = useState([])
  console.log(data);

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
          <div className="dark">
            <button>
              Yangi vazifa qo'shish
            </button>
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
                  </div>

                  <p className="desc">{item?.description}</p>

                  <div className="date">
                    <span>{item?.deadline}</span>
                    
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
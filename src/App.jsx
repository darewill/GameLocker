import React from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Leftbar from './components/Leftbar'

function App() {
  const Homepage = () => {

  return (
    <div className="main-container">
      <div className="left-side">
        <Leftbar />
      </div>
      <div className="right-side">
        <Outlet />
      </div>
    </div>
  )
}
}

export default App

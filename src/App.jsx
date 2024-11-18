import React from 'react'
import './App.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Leftbar from './components/Leftbar'
import Home from './components/Home'

function App() {
  const Homepage = () => {

  return (
    <div className="main-container flex items-center">
      <div className="left-side sticky w-[15%] shadow-2xl mt-[25px]">
        <Leftbar />
      </div>
      <div className="right-side w-[85%] flex justify-center">
        <Outlet />
      </div>
    </div>
  )
}
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
      children: [
        {
        path: "/",
        element: <Home />,
        }
      ],
    },
    {
      
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App

import React from 'react'
import './App.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Leftbar from './components/Leftbar'
import Home from './components/Home'
import CS2Page from './components/CS2Page'
import ValorantPage from './components/ValorantPage'
import Overwatch from './components/Overwatch'
import LOLPage from './components/LOLPage'

function App() {
  const Homepage = () => {

  return (
    <div className="main-container flex">
      <div className="left-side fixed w-[15%] shadow-2xl mt-[25px]">
        <Leftbar />
      </div>
      <div className="right-side grid justify-center">
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
        },
        {
          path: "cs2",
          element: <CS2Page />,
        },
        {
          path: "valorant",
          element: <ValorantPage />,
        },
        {
          path: "overwatch",
          element: <Overwatch />,
        },
        {
          path: "leagueoflegends",
          element: <LOLPage />,
        },
      ],
    },
    {
      
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App

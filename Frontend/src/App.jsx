import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
 
import './App.css'
import Signup from './components/signup'
import SignUp from './components/signup'
import Login from './components/login'
import Mainlayout from './components/mainlayout';
import Home from './components/Home';
import Profile from './components/profile'

function App() {
  const [count, setCount] = useState(0)
  const browserRouter=createBrowserRouter([
    {
      path:'/',
      element:<Mainlayout/>,
      children:[
        {
        path:'/',
        element:<Home/>
      },
      {
        path:'/profile',
        element:<Profile/>
      }]
    } ,
    {
      path:'/register',
      element:<SignUp/>
    },
    {
      path:'/login',
      element:<Login/>
    }
  ])

  return (
    <>
      <RouterProvider router={browserRouter}/>
    </>
  )
}

export default App

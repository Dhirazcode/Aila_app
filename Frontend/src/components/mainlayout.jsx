import React from 'react'
import { Outlet } from 'react-router-dom'

const mainlayout = () => {
  return (
   <div>
    Sidebar
    <div> 
        <Outlet/>
    </div>
   </div>
  )
}

export default mainlayout
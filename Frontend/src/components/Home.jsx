import React from 'react'
import Feed from './ui/Feed'
import { Outlet } from 'react-router-dom'
import RightSidebar from './rightSidebar'
import useGetAllPost from '@/Hooks/useGetAllPost'
const Home = () => {
  useGetAllPost();
  return (
    <div className='flex'>
      <div className='flex-grow'>
        <Feed/>
        <Outlet/>
      </div>
      <RightSidebar/>
    </div>
  )
}

export default Home
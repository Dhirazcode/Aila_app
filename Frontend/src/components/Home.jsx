import React from 'react'
import Feed from './ui/Feed'
import { Outlet } from 'react-router-dom'
import RightSidebar from './rightSidebar'
import useGetAllPost from '@/Hooks/useGetAllPost'
import useGetSuggestedUsers from '@/Hooks/useGetSuggesestedUsers'
const Home = () => {
  useGetAllPost();
  useGetSuggestedUsers();
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
import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { useSelector } from 'react-redux'
import SuggestedUser from './ui/suggestedUser.jsx'
// console.log(SuggestedUser)

const rightSidebar = () => {
  const {user}=useSelector(store=>store.auth)
  return (
    <div className='w-fit py-10 pr-32'>
      <div className='flex items-center gap-4'>
        <Link to={`/profile/${user._id}`}>
          <Avatar>
            <AvatarImage src={user?.ProfilePicture} className="w-12 h-12 rounded-full" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h1 className='font-semibold text-sm'><Link to={`/profile/${user._id}`}>{user?.Username}</Link></h1>
          <span className='text-gray-600 text-sm'>{user?.bio || 'bio here...'}</span>
        </div>
      </div>
      <SuggestedUser/>
    </div>
  )
}

export default rightSidebar
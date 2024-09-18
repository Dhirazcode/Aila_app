import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const suggestedUser = () => {
    const { suggestedUsers } = useSelector(store => store.auth)
    return (
        <div className='my-10'>
            <div className='flex items-center justify-between gap-2'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>see all</span>
            </div>
            {
                suggestedUsers.map((user) => {
                    return (
                        <div key={user._id}>
                            <div className='flex items-center gap-4'>
                                <Link to={`/profile/${user?._id}`}>
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
                        </div>
                    )
                })
            }
        </div>
    )
}

export default suggestedUser
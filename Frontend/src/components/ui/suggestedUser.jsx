import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SuggestedUser = () => {
    const { suggestedUsers = [] } = useSelector((store) => store.auth); // Safely access suggestedUsers array
    // console.log('Suggested Users:', suggestedUsers);

    return (
        <div className='my-10'>
            <div className='flex items-center justify-between gap-2'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>See all</span>
            </div>
            {suggestedUsers.length > 0 ? (
                suggestedUsers.map((user) => (
                    <div key={user._id} className="flex items-center justify-between gap-5 my-5 py-2 ">
                        <Link to={`/profile/${user?._id}`}>
                            <Avatar>
                                <AvatarImage
                                    src={user?.ProfilePicture || "https://via.placeholder.com/150"} // Fallback to a placeholder image
                                    className="w-12 h-12 rounded-full"
                                />
                                <AvatarFallback>{user?.Username?.[0] || "?"}</AvatarFallback>
                            </Avatar>
                        </Link>
                        <div>
                            <h1 className='font-semibold text-sm'>
                                <Link to={`/profile/${user._id}`}>{user?.Username}</Link>
                            </h1>
                            <span className='text-gray-600 text-sm'>
                                {user?.Bio || 'No bio available'}
                            </span>
                        </div>
                        <span className='font-bold cursor-pointer text-sm text-blue-400 hover:text-blue-600 ml-1'>follow</span>
                    </div>
                ))
            ) : (
                <p>No suggested users available.</p>
            )}
        </div>
    );
};

export default SuggestedUser;

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react';

const Comment = ({ comment }) => {
    return (
        <div className='my-2'>
            <div className='flex gap-3 items-center'>
                <Avatar>
                    <AvatarImage src={comment?.Author?.ProfilePicture}className="w-12 h-12 rounded-full" />
                    <AvatarFallback>{comment?.Author?.Username}</AvatarFallback>
                </Avatar>
                <h1 className='font-bold text-sm'>
                    {comment?.Author?.Username}
                    <span className='font-normal pl-1'>{comment.text}</span>
                </h1>
            </div>
        </div>
    );
}

export default Comment;

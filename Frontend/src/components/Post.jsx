import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Dialog,  DialogTrigger } from '@radix-ui/react-dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Commentdialog from './ui/Commentdialog'
import { DialogContent } from './ui/dialog'

const Post = () => {
    const [text , setText] =useState('');
    const [open , setOpen]=useState(false);

    const changeEventHandler =(e)=>{
        const inputText = e.target.value;
        if(inputText.trim()){
            setText(inputText)
        }else{
            setText('')
        }
    }
    return (
        <div className='my-8 w-full max-w-sm mx-auto'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2 '>
                    <Avatar >
                        <AvatarImage src='' alt='Post_Image' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1>username</h1>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <MoreHorizontal className='cursor-pointer' />
                    </DialogTrigger> 
                    <DialogContent className='flex flex-col text-sm items-center text-center'>
                    <Button variant='ghost' className='cursor-pointer outline-none w-fit text-[#ED4946] font-bold'>UnFollow</Button>
                        <Button variant='ghost' className='cursor-pointer w-fit'>Add to favorites</Button>
                        <Button variant='ghost' className='cursor-pointer w-fit'>Delete</Button>
                    </DialogContent>
                </Dialog>
            </div>
            <img className='w-full my-2 rounded-sm aspect-square object-cover' src="https://media.istockphoto.com/id/1461340089/photo/tourist-on-the-beaches-of-thailand.jpg?s=1024x1024&w=is&k=20&c=YdMOIny37GIJIJ3TdFHWrnNkOmO5fLuX-6TT0IcDaBY=" alt="Post_image"
            />
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3 my-2'>
                    <FaRegHeart size={'22px'} className='cursor-pointer hover:bg-orange-600' />
                    <MessageCircle onClick={()=> setOpen(true)} className='cursor-pointer hover:bg-orange-600' />
                    <Send className='cursor-pointer hover:bg-orange-600' />
                </div>
                <Bookmark className='cursor-pointer hover:bg-orange-600' />
            </div>
            <span className='font-medium block mb-2'>1k likes</span>
            <p>
                <span className='mr-2 font-medium'>Username</span>
                Caption
            </p>
            <span onClick={()=> setOpen(true)} className='cursor-pointer text-sm text-gray-400'>View all comments</span>
            <Commentdialog open={open} setOpen={setOpen}/>
            <div className='flex items-center justify-between'>
                <input
                    type="text"
                    value={text}
                    onChange={changeEventHandler}
                    placeholder='Add comments ...'
                    className='font-sm outline-none w-full'
                />
                {
                
                text && <span className='text-[#3BADF8]'>Post</span>
                }
            </div>
        </div>
    )
}

export default Post
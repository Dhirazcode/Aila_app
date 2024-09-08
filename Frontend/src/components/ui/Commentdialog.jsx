import { Dialog } from '@radix-ui/react-dialog'
import React, { useState } from 'react'
import { DialogContent, DialogTrigger } from './dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './button'

const Commentdialog = ({ open, setOpen }) => {
    const [text , setText] = useState("");
    const changeEventHandler=(e)=>{
        const inputText =e.target.value;
        if(inputText.trim()){
            setText(inputText)
        }else{
            setText('');
        }
    }

    const sendMessageHandler=(e)=>{
        alert(text)
    }
    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)} className='max-w-4xl p-0 flex flex-col'>
                <div className='flex flex-1'>
                    <div className='w-1/2'>
                        <img src="https://media.istockphoto.com/id/1461340089/photo/tourist-on-the-beaches-of-thailand.jpg?s=1024x1024&w=is&k=20&c=YdMOIny37GIJIJ3TdFHWrnNkOmO5fLuX-6TT0IcDaBY=" alt="Post_image" className='w-full h-full object-cover rounded-l-lg' />
                    </div>
                    <div className='w-1/2 flex flex-col justify-between'>
                        <div className='flex items-center justify-between p-4'>
                            <div className='flex items-center'>
                                <Link>
                                    <Avatar>
                                        <AvatarImage img='' />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <Link className='font-semibold text-xs ml-2'>Username</Link>
                                    {/* <span className='ml-2'>Bio here..</span> */}
                                </div>
                            </div>
                            <Dialog>
                                <DialogTrigger>
                                    <MoreHorizontal className='cursor-pointer' />
                                </DialogTrigger>
                                <DialogContent className='flex flex-col items-center text-sm text-center'>
                                    <div className='cursor-pointer text-[#ED4946] w-fit font-bold'>Unfollow</div>
                                    <div className='cursor-pointer text-gray-700 w-fit font-bold'>Add to favorites</div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <hr />
                        <div className='flex-1 overflow-y-auto p-4 max-h-96'>
                            comment aaudai xa
                            comment aaudai xa
                            comment aaudai xa
                            comment aaudai xa

                        </div>
                        <div className='p-4'>
                            <div className='flex items-center gap-2'>
                                <input type="text" value={text} onChange={  changeEventHandler} placeholder='Add a comment' className='w-full outline-none p-2 border border-gray-400 rounded' />
                                <Button disabled={!text.trim()} variant='outline' onChange={ sendMessageHandler} className='cursor-pointer hover:bg-green-600'>Send</Button>
                            </div>
                            
                        </div>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default Commentdialog
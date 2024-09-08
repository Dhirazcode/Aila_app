import { Dialog } from '@radix-ui/react-dialog'
import React from 'react'
import { DialogContent } from './dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Link } from 'react-router-dom'

const Commentdialog = ({ open, setOpen }) => {
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
                            <span className='ml-2'>Bio here..</span>
                           </div>
                           </div>
                        </div>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default Commentdialog
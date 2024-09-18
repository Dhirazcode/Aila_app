import { Dialog } from '@radix-ui/react-dialog';
import React, { useEffect, useState } from 'react';
import { DialogContent, DialogTrigger } from './dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Link } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { Button } from './button';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import axios from 'axios';
import { toast } from 'sonner';
import { setPosts } from '@/Redux/postSlice';

const Commentdialog = ({ open, setOpen }) => {
    const [text, setText] = useState("");
    const { selectedPost, posts } = useSelector(store => store.post);
    const dispatch = useDispatch();
    const [comment, setComment] = useState([]);

    useEffect(()=>{
        if(selectedPost){
            setComment(selectedPost?.Comments)
        }
        
    },[selectedPost])

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        setText(inputText.trim() ? inputText : '');
    };

   const sendMessageHandler = async () => {
    if (!text.trim()) return;  // Ensure input is not empty

    try {
        const res = await axios.post(
            `http://localhost:8000/api/v1/post/${selectedPost?._id}/comment`,
            { text },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );

        if (res?.data?.success) {
            const newComment = res.data.comment;

            // Update local and Redux state
            setComment(prevComments => [...prevComments, newComment]);
            const updatedPosts = posts.map(post =>
                post._id === selectedPost._id
                    ? { ...post, Comments: [...post.Comments, newComment] }
                    : post
            );
            dispatch(setPosts(updatedPosts));

            setText('');  // Clear input field
            toast.success(res.data.message);  // Show success message
        } else {
            toast.error('Something went wrong, please try again.');
        }
    } catch (error) {
        toast.error(error.response?.data?.message || 'An error occurred while posting the comment.');
    }
};



    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogContent onInteractOutside={() => setOpen(false)} className='max-w-4xl p-0 flex flex-col'>
                <div className='flex flex-1'>
                    <div className='w-1/2'>
                        <img src={selectedPost?.Image} alt="Post_image" className='w-full h-full object-cover rounded-l-lg' />
                    </div>
                    <div className='w-1/2 flex flex-col justify-between'>
                        <div className='flex items-center justify-between p-4'>
                            <div className='flex items-center'>
                                <Link>
                                    <Avatar>
                                        <AvatarImage src={selectedPost?.Author?.ProfilePicture} className="w-12 h-12 rounded-full" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <Link className='font-semibold text-sm ml-2'>{selectedPost?.Author?.Username}</Link>
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
                            { 
                                comment.map((comment) => (
                                    <Comment key={comment._id} comment={comment} />
                                )
                            )  }
                        </div>
                        <div className='p-4'>
                            <div className='flex items-center gap-2'>
                                <input
                                    type="text"
                                    value={text}
                                    onChange={changeEventHandler}
                                    placeholder='Add a comment'
                                    className='w-full outline-none p-2 border border-gray-400 rounded'
                                />
                                <Button
                                    disabled={!text.trim()}
                                    variant='outline'
                                    onClick={sendMessageHandler}
                                    className='cursor-pointer hover:bg-green-600'
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Commentdialog;

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Commentdialog from './ui/Commentdialog';
import { DialogContent } from './ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setPosts, setSelectedPost } from '@/Redux/postSlice';
import { Badge } from './ui/badge';


const Post = ({ post }) => {
    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const { posts } = useSelector(store => store.post);
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(post.Likes.includes(user?._id) || false);
    const [likePost, setLikePost] = useState(post.Likes.length);
    const [comment, setComment] = useState(post.Comments)


    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        setText(inputText.trim());
    };

    const likeOrDisliked = async () => {
        try {
            const action = liked ? 'dislike' : 'like';
            const res = await axios.get(`http://localhost:8000/api/v1/post/${post._id}/${action}`, { withCredentials: true });

            if (res.data.success) {
                const updatedLiked = liked ? likePost - 1 : likePost + 1;
                setLikePost(updatedLiked);
                setLiked(!liked);
                const updatedPostData = posts.map(p =>
                    p._id === post._id ? {
                        ...p,
                        Likes: liked ? p.Likes.filter(id => id !== user._id) : [...p.Likes, user._id]
                    } : p
                );
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update like status.');
        }
    };

    const commentHandler = async () => {
        try {
            const res = await axios.post(
                `http://localhost:8000/api/v1/post/${post?._id}/comment`,
                { text },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                const updatedCommentData = [...comment, res.data.message];
                setComment(updatedCommentData);
                setText('');
                const updatedPostData = posts.map(p =>
                    p._id === post._id
                        ? { ...p, Comments: updatedCommentData }
                        : p
                );
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };
    const deletePostHandler = async () => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/post/delete/${post?._id}`, { withCredentials: true });
            if (res.data.success) {
                const updatedPosts = posts.filter(postItem => postItem?._id !== post?._id);
                dispatch(setPosts(updatedPosts));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete post.');
        }
    };

    return (
        <div className='my-8 w-full max-w-sm mx-auto'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage className='w-10 h-10 object-cover rounded-full' src={post.Author?.ProfilePicture} alt='Post_Image' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex items-center gap-3'>
                        <h1>{post.Author?.Username}</h1>
                        {user?._id == post?.Author._id && <Badge variant='secondary'>Author</Badge>}
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <MoreHorizontal className='cursor-pointer' />
                    </DialogTrigger>
                    <DialogContent className='flex flex-col text-sm items-center text-center'>
                        <Button variant='ghost' className='cursor-pointer outline-none w-fit text-[#ED4946] font-bold'>UnFollow</Button>
                        <Button variant='ghost' className='cursor-pointer w-fit'>Add to favorites</Button>
                        {user && user._id === post.Author._id && (
                            <Button variant='ghost' className='cursor-pointer w-fit' onClick={deletePostHandler}>Delete</Button>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
            <img className='w-full my-2 rounded-sm aspect-square object-cover' src={post.Image} alt="Post_image" />
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3 my-2'>
                    {
                        liked ?
                            <FaHeart onClick={likeOrDisliked} size={'22px'} className='cursor-pointer text-red-600' /> :
                            <FaRegHeart onClick={likeOrDisliked} size={'22px'} className='cursor-pointer hover:text-gray-600' />
                    }
                    <MessageCircle onClick={() => {
                        dispatch(setSelectedPost(post))
                        setOpen(true);
                    }} className='cursor-pointer hover:text-gray-600' />
                    <Send className='cursor-pointer hover:bg-orange-600' />
                </div>
                <Bookmark className='cursor-pointer hover:bg-orange-600' />
            </div>
            <span className='font-medium block mb-2'>{likePost} Likes</span>
            <p>
                <span className='mr-2 font-medium'>{post.Author?.Username}</span>
                {post.Caption}
            </p>
            {
                comment.length > 0 && (
                    <span onClick={() => {
                        dispatch(setSelectedPost(post))
                        setOpen(true);
                    }} className='cursor-pointer text-sm text-gray-400'>View {comment.length} comments</span>
                )
            }

            <Commentdialog open={open} setOpen={setOpen} />
            <div className='flex items-center justify-between'>
                <input
                    type="text"
                    value={text}
                    onChange={changeEventHandler}
                    placeholder='Add comments ...'
                    className='font-sm outline-none w-full'
                />
                {text && <span onClick={commentHandler} className='text-[#3BADF8] cursor-pointer'>Post</span>}
            </div>
        </div>
    );
};

export default Post;

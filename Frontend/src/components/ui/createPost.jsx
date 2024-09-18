import { Dialog } from '@radix-ui/react-dialog';
import React, { useRef, useState } from 'react';
import { DialogContent, DialogHeader } from './dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Textarea } from './textarea';
import { Button } from './button';
import { readFileAsDataURl } from '@/lib/utils.js';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/Redux/postSlice';

const CreatePost = ({ open, setOpen }) => {
  const imageref = useRef();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const { posts } = useSelector(store => store.post);

  const eventFileHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataurl = await readFileAsDataURl(file);
      setImagePreview(dataurl);
    }
  };

  const createPostHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', caption);
    if (file) formData.append('image', file);

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8000/api/v1/post/addPost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        // Clear the input fields and image preview
        setCaption('');
        setFile(null);
        setImagePreview('');
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className='text-center font-bold'>Create new Post</DialogHeader>
        <div className='flex items-center gap-3'>
          <Avatar>
            <AvatarImage className='w-10 h-10 object-cover rounded-full' src={user?.ProfilePicture} alt='User avatar' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className='font-semibold text-xs'>{user?.Username}</h1>
            <span className='text-gray-600 text-xs'>Bio here...</span>
          </div>
        </div>
        <Textarea 
          value={caption} 
          onChange={(e) => setCaption(e.target.value)} 
          className='focus-visible:ring-transparent border-none' 
          placeholder='Write a caption' 
        />
        {imagePreview && (
          <div className='w-full h-65 items-center justify-center'>
            <img src={imagePreview} alt='Image preview' className='object-cover h-full w-full rounded-md' />
          </div>
        )}
        <input 
          ref={imageref} 
          type='file' 
          className='hidden' 
          onChange={eventFileHandler} 
        />
        <Button 
          onClick={() => imageref.current.click()} 
          className='w-fit mx-auto bg-[#0095f6] hover:bg-[#154d72]'
        >
          Select From Computer
        </Button>
        {imagePreview && (
          loading ? (
            <Button>
              <Loader2 className='mr-2 w-4 h-4 animate-spin' />
              Please wait
            </Button>
          ) : (
            <Button 
              type='submit' 
              onClick={createPostHandler} 
              className='w-full'
            >
              Post
            </Button>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;

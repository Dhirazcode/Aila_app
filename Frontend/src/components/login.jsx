import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '@/Redux/authSlice';

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const [loading, setLoading] = useState(false);
    const navigate =useNavigate();
    const dispatch =useDispatch();

    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/login', {
                Email: input.email,  // Ensure the keys match
                Password: input.password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (res.data.Success) {
                dispatch(setAuthUser(res.data.user));
                // console.log(dispatch(setAuthUser(res.data.user)));
                navigate('/')
                toast.success(res.data.message);
                setInput({
                    email: '',
                    password: ''
                });
            } else {
                toast.error(res.data.message || "An error occurred");
            }

        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error.message);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex h-screen w-screen items-center justify-center'>
            <form onSubmit={loginHandler} className='flex flex-col gap-5 p-8 shadow-lg'>
                <div className='my-4'>
                    <h1 className='text-center font-bold text-xl'>Login</h1>
                    <p className='text-sm text-center'>Login to see photos and videos of your friends</p>
                </div>
                 
                <div>
                    <span className='font-medium'>Email</span>
                    <Input
                        type="email"
                        name='email'
                        value={input.email}
                        onChange={changeEventHandler}
                        placeholder='Enter your email'
                        autoComplete="email"
                        className='focus-visible:ring-transparent py-2'
                    />
                </div>
                <div>
                    <span className='font-medium'>Password</span>
                    <Input
                        type="password"
                        name='password'
                        value={input.password}
                        onChange={changeEventHandler}
                        placeholder='Enter your password'
                        autoComplete="current-password"
                        className='focus-visible:ring-transparent py-2'
                    />
                </div>
                {
                loading ? (
                    <Button>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                            please wait ..
                        
                    </Button>
                ):(
                    <Button type='submit'  >
                     Login
                </Button>
                )
            }
                
                <span className='text-center'>Register your account ? <Link to='/register' className='text-blue-500'>Signup</Link></span>
            </form>
        </div>
    );
};

export default Login;

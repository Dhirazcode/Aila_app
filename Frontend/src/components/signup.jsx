import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import axios from 'axios'
import { toast } from 'sonner'

const signup = () => {
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: ''
    })
    const changeEventHandler = (e) => {
        console.log(input)
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const [loading, setLoading] = useState(false)
    const signuphandler = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true)
            const res = await axios.post('http://localhost:8000/api/v1/user/register', input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message)
                setInput({
                    username: '',
                    email: '',
                    password: ''
                })
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='flex h-screen w-screen items-center justify-center'>
            <form onSubmit={signuphandler} className='flex flex-col gap-5 p-8 shadow-lg'>
                <div className='my-4'>
                    <h1 className=' text-center font-bold text-xl'>Signup</h1>
                    <p className='text-sm text-center'>Signup to to see photos and videos of your Friend</p>
                </div>
                <div>
                    <span className=' font-medium'>Username</span>
                    <Input
                        type="text"
                        name='username'
                        value={input.username}
                        onChange={changeEventHandler}
                        placeholder='Enter your name'
                        className=' focus-visible:ring-transparent  '>
                    </Input>
                </div>
                <div>
                    <span className=' font-medium'>Email</span>
                    <Input
                        type="text"
                        name='email'
                        value={input.email}
                        onChange={changeEventHandler}
                        placeholder='Enter your email'
                        className=' focus-visible:ring-transparent py-2'>
                    </Input>
                </div>
                <div>
                    <span className=' font-medium'>Password</span>
                    <Input
                        type="text"
                        name='password'
                        value={input.password}
                        onChange={changeEventHandler}
                        placeholder='Enter your password'
                        className=' focus-visible:ring-transparent py-2'>
                    </Input>
                </div>
                <Button type='submit'>Signup</Button>
            </form>
        </div>
    )
}

export default signup
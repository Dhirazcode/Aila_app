import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Heart, Home, LogOut, MessageCircle, PlusCircle, Search, TrendingUp } from 'lucide-react';

const sidebarItems = [
    { icon: <Home />, text: 'Home' },
    { icon: <Search />, text: 'Search' },
    { icon: <TrendingUp />, text: 'Explore' },
    { icon: <MessageCircle />, text: 'Messages' },
    { icon: <Heart />, text: 'Notifications' },
    { icon: <PlusCircle />, text: 'Create' },
    {
        icon: (
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="w-6 h-5" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        ),
        text: 'Profile'
    },
    { icon: <LogOut />, text: 'Logout' }
];

const LeftSidebar = () => {
   const navigate = useNavigate();
const logOuthandler = async () => {
    try {
        const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
        console.log(res, "res");
        if (res.data.Success) {
            toast.success(res.data.message);
            navigate('/login');

        }
    } catch (error) {
        toast.error(error.response?.data?.message || 'Logout failed');
    }
};


    const sidebarhandler = (textType) => {
        if (textType == 'Logout') logOuthandler();
    };

    return (
        <div className="fixed top-0 w-[16%] z-10 px-4 left-0 border-r border-gray-300 h-screen">
            <div className="flex flex-col">
                <h1 className='my-8 font-bold pl-3 text-xl'>LOGO</h1>
                <div>
                    {sidebarItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => sidebarhandler(item.text)}
                            className="flex items-center gap-3 hover:bg-gray-100 cursor-pointer relative p-3 rounded-lg my-3">
                            {item.icon}
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeftSidebar;

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { setUserProfile } from '@/Redux/authSlice'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import useGetUserProfile from '@/Hooks/useGetUSerProfile'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { AtSign, Bold } from 'lucide-react'

const profile = () => {
   const parmas=useParams();
   const userId = parmas.id;
   const isLogginedUserProfile=true;
   const isfollowing=false;
  //  console.log(userId)
  useGetUserProfile(userId)

   const {userProfile}=useSelector(store=>store.auth)
   const [activeTab , setActiveTab]=useState("Posts")
  //  console.log(userProfile)
  const handleTabChange=(tab)=>{
    setActiveTab(tab);
  }
  return (
    <div className='flex max-w-4xl justify-center pl-10 mx-auto'>
      <div className='flex flex-col p-8 gap-20'>
      <div className='grid grid-cols-2'>
        <section className='flex justify-center items-center'>
        <Avatar className='w-32 h-32'>
        <AvatarImage src={userProfile?.ProfilePicture}  alt='profilePicture'/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
        </section>
        <section>
          <div className='flex flex-col gap-5'>
            <div className='flex items-center gap-2'>
            <span>{userProfile?.Username}</span>
            {
              isLogginedUserProfile ? (
                <> 
                <Button variant='secondary' className='hover:bg-gray-300  h-8'>Edit Profile</Button>
                <Button variant='secondary'  className='hover:bg-gray-300 h-8 '>View archive</Button>
                <Button variant='secondary'  className='hover:bg-gray-300 h-8 '>Ad tools</Button>
                
              </>
              ):(
                isfollowing? (
                  <>
                  <Button variant='secondary' className='h-8'>UnFollow</Button>
                  <Button variant='secondary' className='h-8'>Message</Button>
                  </>
                ):(
                <Button className='bg-[#0096f8] h-8 hover:bg-[#296d9b] '>Follow</Button>
                )
                
              )
            }
           
            </div>
            <div className='flex items-center gap-4'>
              <p> <span className='font-semibold'>{userProfile.Posts.length}</span>Posts</p>
              <p><span className='font-semibold'>{userProfile.Followers.length} </span>Followers</p>
              <p> <span className='font-semibold'> {userProfile.Following.length}</span> Following</p>

            </div>
            <div className='flex flex-col gap-1'>
              <p className='font-semibold'>{userProfile?.Bio || "Bio is here.."}</p>
              <Badge className='w-fit' variant='secondary'><AtSign/><span className='pl-1'>{userProfile?.Username}</span></Badge>
              <span>😀Hello , Welcome Developers</span>
            </div>
          </div>
        </section>
      </div>
      <div className='border-t border-t-300'>
        <div className='flex items-center justify-center gap-10 text-sm'>
          <span className={`py-4 cursor-pointer ${activeTab == 'Posts' ? 'font-bold' : ''}` } onClick={()=>handleTabChange("Posts")}> Posts</span>
          <span className= {`py-4 cursor-pointer ${activeTab == 'Saved' ? 'font-bold' : ''}`} onClick={()=>handleTabChange("Saved")}>Saved</span>
        </div>
      </div>
      </div>
    </div>
  )
}

export default profile
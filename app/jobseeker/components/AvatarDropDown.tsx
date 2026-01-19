"use client"
import { useAuthStore } from '@/app/store/useAuthStore'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Settings, User, User2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'


const AvatarDropDown = () => {
    const router = useRouter()
    const user = useAuthStore(state =>state.user)
    const [profileImage,setProfileImage] = useState<string | undefined>(undefined)

       const handleEditProfile = () => {
        if (!user) return
      
        if (user.role ==="JobFacilitator") {
            router.push("/jobfacilator/editprofile")
        } else {
            router.push("/jobseeker/editprofile")
        }
    }

    useEffect(()=>{
      const fetchUserProfile = async ()=>{
        const res = await fetch(`/api/userprofile`,{
          method:"GET",
          headers:{
            Authorization:`Bearer ${user?.token}`,
            "Content-Type":"Application?json"
          }
        })
        const data = await res.json()
        console.log(data);
        setProfileImage(data.profileImage)
        
      }
      fetchUserProfile()
    },[user?.token])
    
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
  <Avatar className="h-11 w-11 md:h-12 md:w-12">
    <AvatarImage src={profileImage} alt="@shadcn" />
    <AvatarFallback>
      <User2Icon className="h-6 w-6" />
    </AvatarFallback>
  </Avatar>
</DropdownMenuTrigger>

      <DropdownMenuContent className="w-48">
        <DropdownMenuItem onClick={handleEditProfile}>
          <User className="mr-2" /> Edit Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/editprofile")}>
          <Settings className="mr-2" /> Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AvatarDropDown
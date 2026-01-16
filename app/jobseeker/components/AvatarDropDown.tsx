"use client"
import { useAuthStore } from '@/app/store/useAuthStore'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Settings, User, User2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'


const AvatarDropDown = () => {
    const router = useRouter()
    const user = useAuthStore(state =>state.user)

       const handleEditProfile = () => {
        if (!user) return
      
        if (user.role ==="JobFacilitator") {
            router.push("/jobfacilator/editprofile")
        } else {
            router.push("/jobseeker/editprofile")
        }
    }
    
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
         <Avatar>
          <AvatarImage src={user?.profileImage} alt="@shadcn" />
          <AvatarFallback><User2Icon/></AvatarFallback>
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
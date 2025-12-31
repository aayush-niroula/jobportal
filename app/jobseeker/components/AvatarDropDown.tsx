"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Settings, User } from 'lucide-react'
import { useRouter } from 'next/navigation'


const AvatarDropDown = () => {
    const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img src="/why.jpg"
          alt="profile"
          className="h-12 w-12 rounded-full object-cover cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem onClick={() => router.push("/jobseeker/editprofile")}>
          <User className="mr-2" /> Edit Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/jobfacilator/editprofile")}>
          <Settings className="mr-2" /> Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AvatarDropDown
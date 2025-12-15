"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { User } from 'lucide-react'
import { useRouter } from 'next/navigation'


const AvatarDropDown = () => {
    const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          src="/why.jpg"
          alt="profile"
          className="h-12 w-12 rounded-full object-cover cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem onClick={() => router.push("/jobseeker/editprofile")}>
          <User className="mr-2" /> Edit Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/jobseeker/settings")}>
          <User className="mr-2" /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/")}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AvatarDropDown
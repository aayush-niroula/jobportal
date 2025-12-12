import { Button } from '@/components/ui/button'
import { Briefcase, MapPin } from 'lucide-react'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const Searchbar = () => {
  return (
    <div className='border-4 border-gray-300 lg:max-h-[181px] lg:min-w-[1110px] flex flex-col  items-center p-8 gap-20 mt-10 md:flex-row md:justify-center'>
        <div className='flex gap-8 justify-center items-center w-full'>
            <div className='border-black border-r-2 w-auto p-4 '>
            <Briefcase />
            </div>
            <input type="text" placeholder='Job-Title' className='border p-2 w-full' />
        </div>
        <div className='flex lg:gap-4 gap-10 sm:gap-8 md:gap-6'>
            <MapPin/>
             <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Location</SelectLabel>
          <SelectItem value="Kathmandu">Kathmandu</SelectItem>
          <SelectItem value="Biratnagar">Biratnagar</SelectItem>
          <SelectItem value="Ithari">Ithari</SelectItem>
          <SelectItem value="Pokhara">Pokhara</SelectItem>
       
        </SelectGroup>
      </SelectContent>
    </Select>
    
        </div>
        <div>
            <Button className='p-6'>Search</Button>
        </div>
    </div>
    
  )
}

export default Searchbar
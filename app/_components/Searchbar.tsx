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
    <div className='border-4 border-gray-300 max-h-[181px] min-w-[1110px] flex justify-between items-center p-8 gap-20 mt-10 md:flex-row md:justify-center'>
        <div className='flex gap-8 justify-center items-center w-full'>
            <div className='border-black border-r-2 w-auto p-4 '>
            <Briefcase />
            </div>
            <input type="text" placeholder='Job-Title' className='border p-2 w-full' />
        </div>
        <div className='flex gap-4'>
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
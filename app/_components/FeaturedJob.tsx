"use client"
import { Button } from "@/components/ui/button"

import { Briefcase, CircleDollarSign, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const FeaturedJob = () => {
  const router = useRouter()
  return (
    <div className=" w-full
      bg-white border border-gray-200 rounded-2xl
      p-4 sm:p-6 md:p-8
      flex flex-col lg:flex-row items-center  gap-4 lg:gap-8
      font-playfair ">
    <Image
  src="/Logo.jpg"
  alt="Company Logo"
  width={160}
  height={160}
  className="rounded-lg object-contain w-28 h-28 lg:w-32 lg:h-32  md:w-44 md:h-44"
/>
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-lg sm:text-xl md:text-2xl ">Frontend Developer</h1>
        <div className=" flex flex-wrap gap-4 text-gray-600 text-sm sm:text-base">
            <div className="flex items-center gap-4">
            <span><Briefcase/></span>
            <p className="text-extralight">Segment </p>
            </div>
            <div className="flex items-center gap-4">
            <span><MapPin/></span>
            <p className="text-extralight">Location </p>
            </div>
            <div className="flex items-center gap-4">
            <span><Clock/></span>
            <p className="text-extralight">Time </p>
            </div>
            <div className="flex items-center gap-4">
            <span><CircleDollarSign/></span>
            <p className="text-extralight">Salary </p>
            </div>
         
        </div>
      </div>
      <div className="shrink-0 mt-2 lg:mt-0">
      <Button className="w-full lg:w-auto py-2 sm:py-3 px-4 sm:px-6" onClick={()=>router.push('/jobseeker/applynow')}>View Details</Button>

      </div>
    </div>
  )
}

export default FeaturedJob
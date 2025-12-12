import { Button } from "@/components/ui/button"
import { Briefcase, CircleDollarSign, Clock, MapPin } from "lucide-react"

const FeaturedJob = () => {
  return (
    <div className="lg:min-w-[1156px] lg:max-h-[311px] bg-white font-playfair border border-black lg:flex-row lg:gap-10  lg:justify-between  lg:items-center p-8 w-[300px] flex flex-col gap-2 sm:gap-4 md:gap-6 ">
      <img src="Logo.jpg" alt="" className="object-contain min-w-[205px] max-h-[170px]" />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-medium ">Frontend Developer</h1>
        <div className=" flex flex-col lg:flex lg:flex-row gap-8 mr-60">
            <div className="flex gap-4">
            <span><Briefcase/></span>
            <p className="text-extralight">Segment </p>
            </div>
            <div className="flex gap-4">
            <span><MapPin/></span>
            <p className="text-extralight">Location </p>
            </div>
            <div className="flex gap-4">
            <span><Clock/></span>
            <p className="text-extralight">Time </p>
            </div>
            <div className="flex gap-4">
            <span><CircleDollarSign/></span>
            <p className="text-extralight">Salary </p>
            </div>
         
        </div>
      </div>
      <Button className="p-6">View Details</Button>
    </div>
  )
}

export default FeaturedJob
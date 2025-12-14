import { Button } from "@/components/ui/button"
import { Briefcase, CircleDollarSign, Clock, MapPin } from "lucide-react"

const FeaturedJob = () => {
  return (
    <div className="bg-white font-playfair border border-black
        flex flex-col gap-4
        w-[320px] sm:w-[420px] md:w-[700px] lg:min-w-[1156px]
        p-4 sm:p-6 md:p-8
        md:gap-8 lg:gap-10
        lg:flex-row lg:items-center lg:justify-between ">
      <img src="Logo.jpg" alt="" className="object-contain min-w-40 md:min-w-[250px] lg:min-w-[205px] max-h-[170px]" />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-medium ">Frontend Developer</h1>
        <div className=" flex flex-col md:flex-row lg:flex lg:flex-row  gap-8 mr-60">
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
import { Button } from "@/components/ui/button"
import { Briefcase, CircleDollarSign, Clock, MapPin } from "lucide-react"

const FeaturedJob = () => {
  return (
    <div className="min-w-[1156px] max-h-[311px] bg-white font-playfair border border-black flex gap-10 items-center justify-between p-8">
      <img src="Logo.jpg" alt="" className="object-contain min-w-[205px] max-h-[170px]" />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-medium ">Frontend Developer</h1>
        <div className="flex gap-8 mr-60">
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
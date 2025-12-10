"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type CandidateCardType={
    name:string,
    location:string,
    education:string,
    description:string,
    role:string,
    skill1:string,
    skill2:string,
    skill3:string,
    image:string
}
const CandidateCard = ({name,location,education,description,role,skill1,skill2,skill3,image}:CandidateCardType) => {
    const router = useRouter()
  return (
    <div className="flex gap-6 bg-white min-w-[786px] font-playfair p-6">
        <div>
            <img src={"/goat.jpg"} alt="candidate-image"  className="object-cover max-h-[300px] rounded-full"/>
        </div>
        <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">{name}</h1>
            <div className="flex gap-4 text-sm font-light">
                <p>{role}</p>
                <p>{location}</p>
                <p>{education}</p>
            </div>
            <div className="bg-[#FAF2F2] h-auto min-w-[489px]">
                <p className="text-sm font-light ">{description}</p>
            </div>
            <h1 className="font-light text-xl">Top Skills</h1>
            <div className="flex  justify-between gap-4">
                <div className="flex gap-4">
                    <p className="p-2 border border-black w-auto">{skill1}</p>
                    <p className="p-2 border border-black w-auto">{skill2}</p>
                    <p className="p-2 border border-black w-auto">{skill3}</p>
                    
                </div>
                <div>
                    <Button onClick={()=>router.push('/jobfacilator/candidates/candidateprofile')}>View Profile</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CandidateCard
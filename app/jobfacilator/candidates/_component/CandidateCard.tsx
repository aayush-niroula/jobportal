"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type CandidateCardType={
    id:string
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
const CandidateCard = ({name,location,education,description,role,skill1,skill2,skill3,image,id}:CandidateCardType) => {
    const router = useRouter()
  return (
    <div className="w-full bg-white font-playfair p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col lg:flex-row gap-6">
        <div className="flex justify-center lg:justify-start">
            <img src={image || "cn"} alt="candidate-image"  className="w-28 h-28 sm:w-36 sm:h-36 lg:w-48 lg:h-48 rounded-full object-cover"/>
        </div>
        <div className="flex flex-col gap-2 flex-1">
            <h1 className="font-bold text-xl">{name}</h1>
            <div className="flex flex-wrap gap-4 text-sm font-light text-gray-600">
                <p>{role}</p>
                <p>{location}</p>
                <p>{education}</p>
            </div>
            <div className="bg-[#FAF2F2] p-3 rounded-lg">
                <p className="text-sm font-light leading-relaxed ">{description}</p>
            </div>
            <h1 className="font-light text-xl">Top Skills</h1>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {[skill1, skill2, skill3].map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm border border-black rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
          <Button
            className="w-full sm:w-auto"
            onClick={() =>
              router.push(`/jobfacilator/candidates/candidateprofile/${id}`)
            }
          >
            View Profile
          </Button>
        </div>
      </div>
    </div>

  )
}

export default CandidateCard
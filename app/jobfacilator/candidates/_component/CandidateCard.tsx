"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { MapPin, GraduationCap, Briefcase, User, ArrowRight } from "lucide-react"

type CandidateCardType = {
    id: string
    name: string,
    location: string,
    education: string,
    description: string,
    role: string,
    skill1: string,
    skill2: string,
    skill3: string,
    image: string
}

const CandidateCard = ({
    name,
    location,
    education,
    description,
    role,
    skill1,
    skill2,
    skill3,
    image,
    id
}: CandidateCardType) => {
    const router = useRouter()

    return (
        <div className="w-full bg-white font-playfair p-5 sm:p-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300 flex flex-col lg:flex-row gap-6 group">
            {/* Profile Image */}
            <div className="flex justify-center lg:justify-start shrink-0">
                <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-lg border-2 border-black overflow-hidden bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {image ? (
                        <img 
                            src={image} 
                            alt={name} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <User className="h-20 w-20 text-gray-400" />
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3 flex-1">
                {/* Name and Info */}
                <div>
                    <h2 className="font-bold text-2xl text-black mb-2 group-hover:underline transition-all">
                        {name}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                            <Briefcase className="h-4 w-4" />
                            <span>{role}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            <span>{location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <GraduationCap className="h-4 w-4" />
                            <span>{education}</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Skills Section */}
                <div>
                    <h3 className="font-semibold text-lg text-black mb-2">
                        Top Skills
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                            {[skill1, skill2, skill3].filter(Boolean).map((skill, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1.5 text-sm border-2 border-black rounded-md bg-white hover:bg-black hover:text-white transition-colors"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <Button
                            className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 border-2 border-black gap-2"
                            onClick={() =>
                                router.push(`/jobfacilator/candidates/candidateprofile/${id}`)
                            }
                        >
                            View Profile
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CandidateCard
"use client";

import { useEffect, useState } from "react";
import FilterSection from "@/app/_components/FilterSection";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import CandidateCard from "./_component/CandidateCard";
import Footer from "@/app/_components/Footer";
import { candidateData } from "@/lib/candidateData";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useSearchParams } from "next/navigation";
const page = () => {
  const [currentPage,setCurrentPage]= useState(1)

  const [candidates,setCandidates]= useState<any[]>([])
  const candidatesPerPage = 4;
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = candidates.slice(indexOfFirstCandidate, indexOfLastCandidate);
  const totalPages = Math.ceil(candidates.length / candidatesPerPage);
  const user = useAuthStore(state=>state.user)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const candidateSection = document.querySelector('.candidate-list-section');
    if (candidateSection) {
      candidateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const searchParms = useSearchParams();

  useEffect(()=>{
    const fetchAllCandidates = async() =>{
      const res = await fetch(`/api/jobseeker?${searchParms.toString()}`)
      const data = await res.json()
      console.log(data);
      setCandidates(data.candidates)
      
    }
    fetchAllCandidates()
  },[user?.id,searchParms])
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="flex flex-col bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto w-full px-4 pt-20">
        
      
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing <span className="font-bold">{indexOfFirstCandidate + 1}-{Math.min(indexOfLastCandidate, candidateData.length)}</span> of {candidateData.length} candidates
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-96 overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-left">Filter Candidates</SheetTitle>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                {/* Search Section */}
                <div className="border border-gray-300 rounded-xl bg-white p-6">
                  <h2 className="text-lg font-bold text-center mb-4">
                    Search Candidates
                  </h2>

                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Skills (e.g., React, Python)"
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />

                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Location</SelectLabel>
                          <SelectItem value="Kathmandu">Kathmandu</SelectItem>
                          <SelectItem value="Biratnagar">Biratnagar</SelectItem>
                          <SelectItem value="Ithari">Ithari</SelectItem>
                          <SelectItem value="Pokhara">Pokhara</SelectItem>
                          <SelectItem value="Remote">Remote</SelectItem>
                          <SelectItem value="Worldwide">Worldwide</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <input
                      type="text"
                      placeholder="Industry"
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />

                    <Button className="w-full">Search</Button>
                  </div>
                </div>

                {/* Filter Sections */}
                <FilterSection
                  title="Experience level"
                  showLocation={false}
                  queryKey="experience"
                  options={[
                    { label: "Entry Level",value:"ENTRY", count: 180 },
                    { label: "Mid Level", value:"MID",count: 42 },
                    { label: "Senior",value:"SENIOR", count: 30 },
                    { label: "Expert",value:"LEAD", count: 20 },
                  ]}

                />

                <FilterSection
                  title="Education level"
                  showLocation={false}
                  options={[
                    { label: "High School", value:"SCHOOL",count: 180 },
                    { label: "Associate's", value:"ASSOCIATE", count: 42 },
                    { label: "Bachelor",  value:"BACHELOR",count: 30 },
                    { label: "Master's", value:"MASTER", count: 20 },
                    { label: "PhD",  value:"PHD",count: 20 },
                  ]}
                />

                <FilterSection
                  title="Skills"
                  showLocation={false}
                  queryKey="skills"
                  options={[
                    { label: "JavaScript", value:"JavaScript", count: 180 },
                    { label: "Java", value:"Java", count: 42 },
                    { label: "Python", value:"Python", count: 30 },
                    { label: "C#", value:"C#", count: 20 },
                  ]}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

    <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">
          
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block space-y-6">
            {/* Search Section */}
            <div className="border border-gray-300 rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-center mb-6">
                Search Candidates
              </h2>

              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Skills (e.g., React, Python)"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <Select>
                  <SelectTrigger className="w-full border border-gray-300">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Location</SelectLabel>
                      <SelectItem value="Kathmandu">Kathmandu</SelectItem>
                      <SelectItem value="Biratnagar">Biratnagar</SelectItem>
                      <SelectItem value="Ithari">Ithari</SelectItem>
                      <SelectItem value="Pokhara">Pokhara</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Worldwide">Worldwide</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <input
                  type="text"
                  placeholder="Industry"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <Button className="w-full">Search</Button>
                <Button variant="outline" className="w-full">Reset Filters</Button>
              </div>
            </div>

            {/* Filter Sections */}
            <div className="space-y-6">
              <FilterSection
                title="Experience level"
                showLocation={false}
                queryKey="experience"
                options={[
                    { label: "Entry Level",value:"ENTRY", count: 180 },
                    { label: "Mid Level", value:"MID",count: 42 },
                    { label: "Senior",value:"SENIOR", count: 30 },
                    { label: "Expert",value:"LEAD", count: 20 },
                  ]}
              />

              <FilterSection
                title="Education level"
                showLocation={false}
                queryKey="education"
      options={[
                    { label: "High School", value:"SCHOOL",count: 180 },
                    { label: "Associate's", value:"ASSOCIATE", count: 42 },
                    { label: "Bachelor",  value:"BACHELOR",count: 30 },
                    { label: "Master's", value:"MASTER", count: 20 },
                    { label: "PhD",  value:"PHD",count: 20 },
                  ]}
              />

              <FilterSection
                title="Skills"
                showLocation={false}
                queryKey="skills"
         options={[
                    { label: "JavaScript", value:"JAVASCRIPT", count: 180 },
                    { label: "Java", value:"JAVA", count: 42 },
                    { label: "Python", value:"PYTHON", count: 30 },
                    { label: "C#", value:"C#", count: 20 },
                  ]}
              />
            </div>
          </div>


          {/* Candidate List */}
          <div className="space-y-4 md:space-y-6">
            {candidates.map((candidate,index) => (
              <CandidateCard
                key={candidate.user.name+ index}
                id={candidate.id}
                name={candidate.user.name}
                  role={candidate.role}
                  location={candidate.location}
                  education={candidate.educations[0]?.degree}
                  description={candidate.professional_summary}
                  skill1={candidate.technical_skills[0]}
                  skill2={candidate.technical_skills[1]}
                  skill3={candidate.soft_skills[0]}
                  image={candidate.profile_image}

               
              />
            ))}

            {/* Pagination */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((pageNum, index) => (
                    pageNum === '...' ? (
                      <span key={`ellipsis-${index}`} className="px-3 py-2">...</span>
                    ) : (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        className="w-10 h-10"
                        onClick={() => handlePageChange(pageNum as number)}
                      >
                        {pageNum}
                      </Button>
                    )
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>           
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default page;

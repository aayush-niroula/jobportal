"use client"
import Searchbar from "../../_components/Searchbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import JobPostCard from "../../_components/JobPostCard";
import FilterSection from "../../_components/FilterSection";
import { Button } from "@/components/ui/button";
import Footer from "../../_components/Footer";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { useEffect, useState } from "react";

const page = () => {
  const [currentPage,setCurrentPage] = useState(1)
  const [jobs, setJobs] = useState<any[]>([]);
  const jobsPerPage= 9;
  const dummyJobData = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: `Job Position ${i + 1}`,
  company: `Company ${i + 1}`,
  location: "New York, NY",
  salary: "$80,000 - $120,000",
  type: i % 3 === 0 ? "Full-time" : i % 3 === 1 ? "Part-time" : "Contract",
  posted: "2 days ago",
}));

const totalPages = Math.ceil(dummyJobData.length/ jobsPerPage)
const indexofLastJob = currentPage * jobsPerPage;
const indexOfFirstJob = indexofLastJob- jobsPerPage
const currentJobs= dummyJobData.slice(indexOfFirstJob,indexofLastJob)

const handlePageChange =(pageumber:number)=>{
  setCurrentPage(pageumber)
  window.scrollTo({top:500,behavior:"smooth"})

}

useEffect(() => {
  const fetchJobs = async () => {
    try {
      const res = await fetch(
        `/api/jobseeker/jobs?page=${currentPage}&limit=${jobsPerPage}`
      );
      const data = await res.json();
      console.log(data);
      

      if (!res.ok || !Array.isArray(data.data)) {
        console.error(data);
        setJobs([]);
        return;
      }

      setJobs(data.data);
    } catch (err) {
      console.error(err);
      setJobs([]);
    }
  };

  fetchJobs();
}, [currentPage]);

  return (
    <div className="p-4 md:p-6 lg:p-10 font-playfair flex flex-col items-center font-playfair bg-[#F1F5F9] ">
      <div className="w-full max-w-7xl">
      <div className="mb-6 md:mb-8">
        <Searchbar />
      </div>

      {/* card section starts here  */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 ">
        <div className="hidden lg:flex flex-col gap-10 shrink-0 ">
          <div className="flex justify-between items-center ">
            <h1>Advance Filter</h1>
            <Button>Reset</Button>
          </div>
        <div className="flex flex-col gap-8">
          <FilterSection
            title="Industry"
            showLocation={false}
            options={[
              { label: "All", count: 180 },
              { label: "0-25k", count: 42 },
              { label: "25k-50k", count: 30 },
              { label: "50k-100k", count: 20 },
              { label: "100k above", count: 15 },
            ]}
          />
          <FilterSection
            title="Salary"
            showLocation={false}
            options={[
              { label: "All", count: 180 },
              { label: "Developer", count: 42 },
              { label: "Medicine", count: 30 },
              { label: "Automobile", count: 20 },
              { label: "Hardware", count: 15 },
            ]}
          />
          <FilterSection
            title="Salary"
            showLocation={false}
            options={[
              { label: "All", count: 180 },
              { label: "Onsite", count: 42 },
              { label: "Remote", count: 30 },
              { label: "Hybrid", count: 20 },
            ]}
          />
        </div>
        </div>
        <div className="flex-1">
           <div className="flex justify-between items-center lg:hidden  mb-6">
            <p className="text-sm">
                SHOWING: <span className="font-bold text-base">{indexOfFirstJob + 1}-{Math.min(indexofLastJob, dummyJobData.length)}</span> of {dummyJobData.length}
              </p>

            {/* Mobile filter drawer */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Filters</Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-72 sm:w-80">
                <SheetHeader>
                  <SheetTitle>Advance Filters</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 mt-6">
                  <FilterSection
                    title="Industry"
                    showLocation={false}
                    options={[
                      { label: "All", count: 180 },
                      { label: "0-25k", count: 42 },
                      { label: "25k-50k", count: 30 },
                      { label: "50k-100k", count: 20 },
                      { label: "100k above", count: 15 },
                    ]}
                  />

                  <FilterSection
                    title="Job Type"
                    showLocation={false}
                    options={[
                      { label: "All", count: 180 },
                      { label: "Developer", count: 42 },
                      { label: "Medicine", count: 30 },
                      { label: "Automobile", count: 20 },
                      { label: "Hardware", count: 15 },
                    ]}
                  />

                  <FilterSection
                    title="Work Mode"
                    showLocation={false}
                    options={[
                      { label: "All", count: 180 },
                      { label: "Onsite", count: 42 },
                      { label: "Remote", count: 30 },
                      { label: "Hybrid", count: 20 },
                    ]}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden lg:flex gap-4 mb-4">
            <div>
             <p className="text-sm">
                SHOWING: <span className="font-bold text-base">{indexOfFirstJob + 1}-{Math.min(indexofLastJob, dummyJobData.length)}</span> of {dummyJobData.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm">Sort by</p>
              <Select>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Latest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Latest</SelectItem>
                  <SelectItem value="dark">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobPostCard 
                  key={job.id}
                  title={job.job_name}
                  company={job.facilitator.company_name}
                  location={job.location}
                  salary_max={job.salary_max}
                  salary_min={job.salary_min}
                  type={job.job_type}
                  posted={job.created_at}
                  description={job.description.join(" ")}
                  skills={job.skills}
                  id={job.id}
                />
              ))}
            </div>

             <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) handlePageChange(currentPage - 1);
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Show only first 3 pages, last 3 pages, and pages around current page
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(pageNumber);
                            }}
                            isActive={currentPage === pageNumber}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) handlePageChange(currentPage + 1);
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
            
            {/* Alternative simpler pagination */}
            <div className="mt-6 flex items-center justify-between lg:hidden">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;

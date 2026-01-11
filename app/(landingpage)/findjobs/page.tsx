"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Searchbar from "../../_components/Searchbar";
import FilterSection, { FilterOption } from "../../_components/FilterSection";
import JobPostCard from "../../_components/JobPostCard";
import Footer from "../../_components/Footer";
import { Button } from "@/components/ui/button";

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
} from "@/components/ui/pagination";

interface Job {
  id: string;
  job_name: string;
  facilitator: { company_name: string };
  location: string;
  salary_max: number;
  salary_min: number;
  job_type: string;
  created_at: string;
  description: string[];
  skills: string[];
}

const jobsPerPage = 9;

const page = () => {
  const router = useRouter();
  const params = useSearchParams();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");


  const industryFilter = params.get("industry") || "all";
  const jobTypeFilter = params.get("jobType") || "all";
  const workModeFilter = params.get("workMode") || "all";

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const query = new URLSearchParams();

        if (search) query.set("search", search);
        if (industryFilter !== "all") query.set("industry", industryFilter);
        if (jobTypeFilter !== "all") query.set("jobType", jobTypeFilter);
        if (workModeFilter !== "all") query.set("workMode", workModeFilter);

        query.set("page", currentPage.toString());
        query.set("limit", jobsPerPage.toString());

        const res = await fetch(`/api/jobseeker/jobs?${query.toString()}`);
        const data = await res.json();

        if (!res.ok || !Array.isArray(data.data)) {
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
  }, [currentPage, search, industryFilter, jobTypeFilter, workModeFilter]);


  const industryOptions: FilterOption[] = [
    { label: "All", value: "all" },
    { label: "IT", value: "IT" },
    { label: "Medicine", value: "Medicine" },
    { label: "Automobile", value: "Automobile" },
  ];

  const jobTypeOptions: FilterOption[] = [
    { label: "All", value: "all" },
    { label: "Full Time", value: "FULL_TIME" },
    { label: "Part Time", value: "PART_TIME" },
    { label: "Contract", value: "CONTRACT" },
    { label: "Intern", value: "INTERN" },
    { label: "Freelance", value: "FREELANCE" },
  ];

  const workModeOptions: FilterOption[] = [
    { label: "All", value: "all" },
    { label: "Onsite", value: "ONSITE" },
    { label: "Remote", value: "REMOTE" },
    { label: "Hybrid", value: "HYBRID" },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-10 font-playfair flex flex-col items-center bg-[#F1F5F9]">
      <div className="w-full max-w-7xl">
        {/* Search */}
        <div className="mb-6 md:mb-8">
          <Searchbar
            value={search}
            onChange={(val: string) => {
              setSearch(val);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
       
          <div className="hidden lg:flex flex-col gap-10 shrink-0">
            <div className="flex justify-between items-center">
              <h1>Advance Filter</h1>
              <Button
                onClick={() => {
                  router.push("/findjobs"); 
                  setCurrentPage(1);
                  setSearch("");
                }}
              >
                Reset
              </Button>
            </div>

            <div className="flex flex-col gap-8">
              <FilterSection
                title="Industry"
                options={industryOptions}
                queryKey="industry"
              />
              <FilterSection
                title="Job Type"
                options={jobTypeOptions}
                queryKey="jobType"
              />
              <FilterSection
                title="Work Mode"
                options={workModeOptions}
                queryKey="workMode"
              />
            </div>
          </div>

          {/* Jobs & mobile filters */}
          <div className="flex-1">
          
            <div className="flex justify-between items-center lg:hidden mb-6">
              <p className="text-sm">
                Showing {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, jobs.length)} of {jobs.length}
              </p>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Filters</Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 sm:w-80">
                  <SheetHeader>
                    <SheetTitle>Advance Filters</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 mt-6">
                    <FilterSection title="Industry" options={industryOptions} queryKey="industry" />
                    <FilterSection title="Job Type" options={jobTypeOptions} queryKey="jobType" />
                    <FilterSection title="Work Mode" options={workModeOptions} queryKey="workMode" />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Job Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentJobs.map((job) => (
                <JobPostCard
                  key={job.id}
                  id={job.id}
                  title={job.job_name}
                  company={job.facilitator.company_name}
                  location={job.location}
                  salary_max={job.salary_max}
                  salary_min={job.salary_min}
                  type={job.job_type}
                  posted={job.created_at}
                  description={job.description.join(" ")}
                  skills={job.skills}
                />
              ))}
            </div>

            {/* Pagination */}
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
                    } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
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
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default page;

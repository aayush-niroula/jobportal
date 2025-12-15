"use client";

import { useState } from "react";
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
import CandidateCard from "./_component/CandidateCard";
import Footer from "@/app/_components/Footer";

const page = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex flex-col bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto w-full px-4 pt-20">
        
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <Button
            className="w-full"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
          
          {/* Filters */}
          <div
            className={`flex flex-col gap-6 ${
              showFilters ? "block" : "hidden"
            } lg:block`}
          >
            {/* Search */}
            <div className="border border-black rounded-2xl bg-white p-6">
              <h1 className="text-xl font-bold text-center">
                Search Candidates
              </h1>

              <div className="flex flex-col gap-4 mt-4">
                <input
                  type="text"
                  placeholder="Skills"
                  className="p-2 border border-black rounded-md"
                />

                <Select>
                  <SelectTrigger className="w-full border border-black">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Location</SelectLabel>
                      <SelectItem value="Kathmandu">Kathmandu</SelectItem>
                      <SelectItem value="Biratnagar">Biratnagar</SelectItem>
                      <SelectItem value="Ithari">Ithari</SelectItem>
                      <SelectItem value="Pokhara">Pokhara</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <input
                  type="text"
                  placeholder="Industry"
                  className="p-2 border border-black rounded-md"
                />

                <Button>Search</Button>
              </div>
            </div>

            {/* Filters */}
            <FilterSection
              title="Experience level"
              showLocation={false}
              options={[
                { label: "Entry Level", count: 180 },
                { label: "Mid Level", count: 42 },
                { label: "Senior", count: 30 },
                { label: "Expert", count: 20 },
              ]}
            />

            <FilterSection
              title="Education level"
              showLocation={false}
              options={[
                { label: "High School", count: 180 },
                { label: "Associate's", count: 42 },
                { label: "Bachelor", count: 30 },
                { label: "Master's", count: 20 },
                { label: "PhD", count: 20 },
              ]}
            />

            <FilterSection
              title="Skills"
              showLocation={false}
              options={[
                { label: "JavaScript", count: 180 },
                { label: "Java", count: 42 },
                { label: "Python", count: 30 },
                { label: "C#", count: 20 },
              ]}
            />
          </div>

          {/* Candidate List */}
          <div className="flex flex-col gap-4 overflow-hidden">
            {[
              "Alex Buffet",
              "Cristiano Ronaldo",
              "John Cena",
              "Elon Musk",
            ].map((name) => (
              <CandidateCard
                key={name}
                name={name}
                role="Full Stack Developer"
                location="Toronto, Canada"
                education="Bachelor's Degree"
                description="Experienced software developer with 5+ years of expertise in building scalable web applications and leading development teams."
                skill1="Node.js"
                skill2="Docker"
                skill3="React"
                image=""
              />
            ))}

            <div className="flex justify-center mt-4">
              <Button>View More</Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default page;

import React from "react";
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

const page = () => {
  return (
    <div className="p-10 font-playfair  flex flex-col items-center gap-4 ">
      <div className="ml-40 mr-40">
        <Searchbar />
      </div>

      {/* card section starts here  */}
      <div className="flex  gap-20 mt-10">
        <div className="flex flex-col gap-10">
          <div className="flex justify-between mt-6 ">
            <h1>Advance Filter</h1>
            <Button>Reset</Button>
          </div>
          {/* filter section  */}
          <FilterSection
            title="Industry"
            showLocation={true}
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
        <div className="">
          <div className="flex gap-4 ">
            <div>
              <p>
                SHOW: <span className="font-bold text-xl">24</span>
              </p>
            </div>
            <div className="flex">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Latest</SelectItem>
                  <SelectItem value="dark">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1  md:grid-cols-3  gap-4 mt-40">
            <JobPostCard />
            <JobPostCard />
            <JobPostCard />
            <JobPostCard />
            <JobPostCard />
            <JobPostCard />
            <JobPostCard />
            <JobPostCard />
            <JobPostCard />
          </div>
        </div>
      </div>
      <Button className="mt-4 p-6 ml-40">View More</Button>
      <Footer/>
    </div>
  );
};

export default page;

"use client";

import { useEffect, useState } from "react";
import Searchbar from "../_components/Searchbar";
import CategoryBox from "../_components/CategoryBox";
import ChooseUsBox from "../_components/ChooseUsBox";
import FeaturedJob from "../_components/FeaturedJob";
import Footer from "../_components/Footer";
import GetStarted from "../_components/GetStarted";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import { Job } from "../types/types";

interface Category {
  id: string;
  category_name: string;
  jobs_count: number; 
}

export default function Home() {
  const [search, setSearch] = useState("");
  const router  = useRouter()
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  const popularSearches = ["Designer", "Web Developer"];

  const handleSearch = () => {
    if (!search.trim()) return; 
    router.push(`/findjobs?search=${encodeURIComponent(search.trim())}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/jobcategory");
        const data = await res.json();

        console.log("Acutal category",data);
        

        const mappedCategories = data?.map((cat: any) => ({
          id: cat.id,
          category_name: cat.category_name,
          jobs_count: cat.jobs_count || 0,
        }));

        console.log(mappedCategories);
        

        setCategories(mappedCategories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

    useEffect(() => {
    const fetchFeaturedJobs = async () => {
      setLoadingFeatured(true);
      try {
        const res = await fetch("/api/featuredjobs");
        const data: { featuredJobs: Job[] } = await res.json();

        const sortedByViews = data?.featuredJobs?.sort((a, b) => (b.views || 0) - (a.views || 0));

       
        const topJobs = sortedByViews.slice(0, 3);

        setFeaturedJobs(topJobs);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoadingFeatured(false);
      }
    };

    fetchFeaturedJobs();
  }, []);

  return (
    <div className="pt-10 flex flex-col items-center gap-8 bg-[#F1F5F9] w-full font-playfair">
      
      <h1 className="text-center lg:text-5xl font-medium text-xl">
        FIND YOUR DREAM JOB TODAY
      </h1>
      <p className="text-center font-light leading-relaxed max-w-2xl">
        Discover opportunities that match your skills. Apply easily, connect with employers,
        and take the next step in your career—all in one platform
      </p>

      <Searchbar
        value={search}
        onChange={(val: string) => setSearch(val)}
       onSearch={handleSearch}
      />

      <p className="font-medium flex items-center gap-2">
        Popular Searches:{" "}
        {popularSearches.map((item, index) => (
          <span
            key={index}
            className="text-sm text-blue-800 nav-underline cursor-pointer"
          >
            {item}
          </span>
        ))}
      </p>

      {/* Categories Carousel */}
      <h1 className="text-4xl font-playfair">Categories</h1>
      <div className="w-full px-4 sm:px-12 lg:px-6">
        <div className="max-w-7xl mx-auto relative">
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 sm:ml-4">
              {categories.map((category, index) => (
                <CarouselItem
                  key={category.id}
                  className="pl-2 sm:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <CategoryBox
                    categoryname={category.category_name}
                    jobsno={category.jobs_count}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 sm:-left-6 lg:-left-12" />
            <CarouselNext className="right-0 sm:-right-6 lg:-right-12" />
          </Carousel>
        </div>
      </div>

      {/* Featured Jobs */}
 <h1 className="text-4xl font-medium pt-8 font-playfair">Featured Jobs</h1>
      <div className="grid gap-6 w-full max-w-7xl px-4 sm:px-0">
        {loadingFeatured ? (
          Array(3)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="w-full h-32 bg-gray-200 animate-pulse rounded-2xl"
              />
            ))
        ) : featuredJobs.length > 0 ? (
          featuredJobs.map((job) => <FeaturedJob key={job.id} job={job} />)
        ) : (
          <p>No featured jobs available</p>
        )}
      </div>

      {/* Why Choose Us */}
      <h1 className="text-4xl font-bold pt-4 font-playfair">Why choose us?</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 gap-6">
        <ChooseUsBox
          title="Modern Design"
          image="/why.jpg"
          description="Our site is inspired with the modern design and structure"
        />
        <ChooseUsBox
          title="Easy to Apply"
          image="/why.jpg"
          description="Applying to jobs has never been easier and faster"
        />
        <ChooseUsBox
          title="Trusted Employers"
          image="/why.jpg"
          description="Connect with verified and trusted employers"
        />
      </div>

      <GetStarted />

      <Footer />
    </div>
  );
}

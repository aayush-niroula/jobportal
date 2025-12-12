"use client";

import { Button } from "@/components/ui/button";
import { Bell, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const JobFacilatorNavbar = () => {
  const [open, setOpen] = useState(false);
  const id = "1"
  const router = useRouter()

  return (
    <nav className="w-full bg-[#F8F9FA] text-black font-playfair px-6 py-4 shadow-sm relative">    
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 shrink-0">
          <img
            src="/Talent.png"
            alt="logo"
            className="h-[60px] w-[60px] object-contain"
          />
          <h1 className="text-xl font-bold leading-5">
            TALENT <br /> LOOP
          </h1>
        </div>
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center gap-4 lg:gap-10 text-sm md:text-base lg:text-lg font-semibold whitespace-nowrap">
           <Link href={'/jobfacilator'}> <li className="cursor-pointer hover:underline">Dashboard</li></Link>
            <li className="cursor-pointer hover:underline">My Jobs</li>
        <Link href={'/jobfacilator/candidates'}><li className="cursor-pointer hover:underline">Candidates</li></Link> 
          <Link href={'/jobseeker/events'}><li className="cursor-pointer hover:underline">Events</li></Link>
           <Link href={`/jobfacilator/postajob/${id}`}><li className="cursor-pointer hover:underline">Post a New Job</li></Link>

           
            <div className="flex items-center gap-3 ml-4">
              <Bell />
              <img
                src="/why.jpg"
                className="h-[45px] w-[45px] rounded-full object-cover"
                alt="profile"
              />
              <h1 className="text-xl font-medium whitespace-nowrap">
                Company Name
              </h1>
            </div>
          </ul>
        </div>

      
        <div className="hidden md:flex items-center">
          <Button onClick={()=>router.push('/')} className="text-lg px-6">Logout</Button>
        </div>


        <button
          className="md:hidden flex items-center"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="md:hidden mt-4 w-full bg-[#F8F9FA] shadow-md rounded-xl p-6 flex flex-col gap-6 text-lg font-medium z-50">
          <Link href="/">
            <span className="cursor-pointer hover:underline">Dashboard</span>
          </Link>

          <span className="cursor-pointer hover:underline">My Jobs</span>

          <span className="cursor-pointer hover:underline">Candidates</span>

          <Link href="/">
            <span className="cursor-pointer hover:underline">Events</span>
          </Link>

          <Link href="/">
            <span className="cursor-pointer hover:underline">
              Post a new Job
            </span>
          </Link>

          <Button className="w-full text-lg py-3">Register / Login</Button>
        </div>
      )}
    </nav>
  );
};

export default JobFacilatorNavbar;

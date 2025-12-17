"use client";

import AvatarDropDown from "@/app/jobseeker/components/AvatarDropDown";
import Notification from "@/app/jobseeker/components/Notfication";
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
      <div className="flex items-center justify-between lg:justify-center">
        <div className="flex items-center gap-3 shrink-0">
          <img
            src="/Talent.png"
            alt="logo"
            className="h-[40px] w-[40px] sm:h-[50px] sm:w-[50px] lg:h-[60px] lg:w-[60px] object-contain"
          />
          <h1 className="text-xl font-bold leading-5">
            TALENT <br /> LOOP
          </h1>
        </div>
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-3 md:gap-5 lg:gap-10 text-sm md:text-base lg:text-lg">
           <Link href={'/jobfacilator'}> <li className="cursor-pointer hover:underline">Dashboard</li></Link>
           <Link href={'/jobfacilator/myjobs/1'}> <li className="cursor-pointer hover:underline">My Jobs</li></Link>
        <Link href={'/jobfacilator/candidates'}><li className="cursor-pointer hover:underline">Candidates</li></Link> 
          <Link href={'/jobseeker/events'}><li className="cursor-pointer hover:underline">Events</li></Link>
           <Link href={`/jobfacilator/postajob/${id}`}><li className="cursor-pointer hover:underline">Post a New Job</li></Link>

           
           
          </ul>
        </div>

      
        <div className="hidden lg:flex lg:gap-4 items-center">
           <div className="flex items-center gap-3 sm:gap-4 ml-2 sm:ml-4">
             <Notification />
            <AvatarDropDown/>
              <h1 className="text-xl font-medium whitespace-nowrap">
                Company Name
              </h1>
            </div>
          <Button onClick={()=>router.push('/')} className="text-lg px-6">Logout</Button>
        </div>


        <button
          className="lg:hidden flex items-center"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="lg:hidden mt-3 w-full bg-[#F8F9FA] shadow-md rounded-xl p-4 flex flex-col gap-4 text-base z-50">
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

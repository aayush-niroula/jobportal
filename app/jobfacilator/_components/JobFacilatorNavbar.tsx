"use client";

import AvatarDropDown from "@/app/jobseeker/components/AvatarDropDown";
import Notification from "@/app/jobseeker/components/Notfication";
import { useAuthStore } from "@/app/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Bell, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const JobFacilatorNavbar = () => {
  const [open, setOpen] = useState(false);
  const id = "1"
  const router = useRouter()
  const user= useAuthStore((state)=>state.user)
  const logout = useAuthStore((state)=>state.logout)
  console.log(user);
  
const handleLogout = ()=>{
logout()
router.push('/')
}
  return (
    <nav className="w-full bg-[#F8F9FA] text-black font-playfair px-6 py-4 shadow-sm relative">    
      <div className="flex items-center justify-between lg:justify-center">
        <div className="flex items-center gap-3 shrink-0">
          <img
            src="/Talent.png"
            alt="logo"
            className="h-10 w-10 sm:h-12.5 sm:w-12.5 lg:h-15 lg:w-15 object-contain"
          />
          <h1 className="text-xl font-bold leading-5">
            TALENT <br /> LOOP
          </h1>
        </div>
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-3 md:gap-5 lg:gap-10 text-sm md:text-base lg:text-lg">
           <Link href={'/jobfacilator'}> <li className="cursor-pointer nav-underline">Dashboard</li></Link>
           <Link href={`/jobfacilator/myjobs/${user?.id}`}> <li className="cursor-pointer nav-underline">My Jobs</li></Link>
        <Link href={'/jobfacilator/candidates'}><li className="cursor-pointer nav-underline">Candidates</li></Link> 
          <Link href={'/jobseeker/events'}><li className="cursor-pointer nav-underline">Events</li></Link>
           <Link href={`/jobfacilator/postajob/${id}`}><li className="cursor-pointer nav-underline">Post a New Job</li></Link>

           
           
          </ul>
        </div>

      
        <div className="hidden lg:flex lg:gap-4 items-center">
           <div className="flex items-center gap-3 sm:gap-4 ml-2 sm:ml-4">
             <Notification />
            <AvatarDropDown/>
              <h1 className="text-xl font-medium whitespace-nowrap">
                {user?.name}
              </h1>
            </div>
          <Button onClick={handleLogout} className="text-lg px-6">Logout</Button>
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
        <div className="lg:hidden mt-3 w-full bg-[#F8F9FA] shadow-md rounded-xl p-4 flex flex-col items-center gap-4 text-base z-50">
          <Link href="/jobfacilator">
            <span className="cursor-pointer nav-underline">Dashboard</span>
          </Link>
          <Link href={`/jobfacilator/myjobs/${user?.id}`}>
            <span className="cursor-pointer nav-underline">My Jobs</span>
          </Link>
          <Link href="/jobfacilator/candidates">
            <span className="cursor-pointer nav-underline">Candidates</span>
          </Link>
          <Link href="/jobseeker/events">
            <span className="cursor-pointer nav-underline">Events</span>
          </Link>
          <Link href={`/jobfacilator/postajob/${id}`}>
            <span className="cursor-pointer nav-underline">Post a New Job</span>
          </Link>
          <Button className="w-full text-lg py-3" onClick={() => router.push('/')}>
            Logout
          </Button>
        </div>
      )}

    </nav>
  );
};

export default JobFacilatorNavbar;

"use client";

import { Button } from "@/components/ui/button";
import { Bell, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const JobSeekerNavbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="w-full bg-[#F8F9FA] text-black font-playfair px-6 py-4 shadow-md">
      <div className="flex justify-between items-center w-full">

     
        <div className="flex items-center gap-3">
          <img
            src="/Talent.png"
            alt="logo"
            className="object-contain h-[60px] w-[60px]"
          />
          <h1 className="font-bold text-xl">TALENT LOOP</h1>
        </div>

    
        <ul className="hidden md:flex gap-10 items-center text-lg">
          <Link href="/jobseeker/Dashboard">
            <li className="cursor-pointer hover:underline">Dashboard</li>
          </Link>

         <Link href={'/jobseeker/myapplicatons'}> <li className="cursor-pointer hover:underline">My Applications</li></Link>

          <Link href="/jobseeker/uploadresume">
            <li className="cursor-pointer hover:underline">Resume Analysis</li>
          </Link>

          <Link href="/findjobs">
            <li className="cursor-pointer hover:underline">Find Jobs</li>
          </Link>

          <div className="flex gap-4 items-center">
            <Bell />
            <img
              src="/why.jpg"
              alt="profile"
              className="h-[45px] w-[45px] rounded-full object-cover"
            />
          </div>

          <h1 className="text-xl font-medium">Username</h1>
        </ul>

        <Button onClick={() => router.push("/")} className="hidden md:block">
          Logout
        </Button>

       
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-6 bg-[#F8F9FA] mt-4 py-4 shadow-lg rounded-lg text-center text-xl">
          <Link href="/dashboard">
            <span className="cursor-pointer hover:underline">Dashboard</span>
          </Link>

          <span className="cursor-pointer hover:underline">My Applications</span>

          <Link href="/jobseeker/uploadresume">
            <span className="cursor-pointer hover:underline">Resume Analysis</span>
          </Link>

          <Link href="/findjobs">
            <span className="cursor-pointer hover:underline">Find Jobs</span>
          </Link>

          <Button onClick={() => router.push("/")}>Logout</Button>
        </div>
      )}
    </nav>
  );
};

export default JobSeekerNavbar;

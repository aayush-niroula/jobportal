"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AvatarDropDown from "./AvatarDropDown";
import { useAuthStore } from "@/app/store/useAuthStore";

const JobSeekerNavbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="w-full bg-[#F8F9FA] text-black font-playfair px-4 md:px-10 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">

        {/* Logo */}
        <Link href="/jobseeker/Dashboard" className="flex items-center gap-3">
          <img
            src="/Talent.png"
            alt="logo"
            className="h-10 w-10 object-contain"
          />
          <h1 className="font-bold text-lg md:text-xl">
            TALENT LOOP
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 lg:gap-12 items-center text-base lg:text-lg">

          <Link href="/jobseeker/myapplicatons">
            <li className="cursor-pointer nav-underline">
              My Applications
            </li>
          </Link>

          <Link href="/jobseeker/uploadresume">
            <li className="cursor-pointer nav-underline">
              Resume Analysis
            </li>
          </Link>

          <Link href="/findjobs">
            <li className="cursor-pointer nav-underline">
              Find Jobs
            </li>
          </Link>

          <Link href="/jobseeker/events">
            <li className="cursor-pointer nav-underline">
              Events
            </li>
          </Link>

          <AvatarDropDown />

          <span className="text-sm lg:text-base font-medium">
            {user?.name}
          </span>
        </ul>

        {/* Desktop Logout */}
        <Button
          onClick={handleLogout}
          className="hidden md:block"
        >
          Logout
        </Button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

   
    
{open && (
  <div className="md:hidden flex flex-col gap-5 bg-[#F8F9FA] mt-4 py-6 shadow-lg rounded-xl text-center text-lg">

  <div className="flex justify-center mb-4">
      <AvatarDropDown />
      {user?.name && (
        <span className="ml-2 font-medium text-base self-center">
          {user.name}
        </span>
      )}
    </div>

    <Link href="/jobseeker/Dashboard">
      <span className="nav-underline">Dashboard</span>
    </Link>

    <Link href="/jobseeker/myapplicatons">
      <span className="nav-underline">My Applications</span>
    </Link>

    <Link href="/jobseeker/uploadresume">
      <span className="nav-underline">Resume Analysis</span>
    </Link>

    <Link href="/findjobs">
      <span className="nav-underline">Find Jobs</span>
    </Link>

    <Link href="/jobseeker/events">
      <span className="nav-underline">Events</span>
    </Link>

  

    <Button
      className="mx-6 mt-2"
      onClick={handleLogout}
    >
      Logout
    </Button>
  </div>
)}

    </nav>
  );
};

export default JobSeekerNavbar;

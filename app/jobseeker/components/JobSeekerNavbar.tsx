"use client"
import { Button } from "@/components/ui/button";
import { Bell, Cross, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const JobSeekerNavbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex justify-between max-h-[147px] w-full  bg-[#F8F9FA] text-black font-playfair">
      <div className="flex gap-4 items-center w-1/3 ">
        <img
          src="/Talent.png"
          alt="logo"
          className="object-contain h-full w-[100px] bg-transparent "
        />
        <h1 className="playfair font-bold ">TALENT LOOP</h1>
      </div>

      <ul className="hidden md:flex flex-1 gap-10 items-center justify-center absolute left-1/2 -translate-x-1/2 top-1/3 ">
        <Link href={""}>
          <li className="playfair font-semibold text-xl cursor-pointer hover:underline ">
            Dashboard
          </li>
        </Link>
        <li className="playfair font-semibold text-xl cursor-pointer hover:underline">
        My applications
        </li>
        <li className="playfair font-semibold text-xl cursor-pointer hover:underline">
          Resume Analysis
        </li>
        <Link href={"/findjobs"}>
          
          <li className="playfair font-semibold text-xl cursor-pointer hover:underline">
            Find Jobs
          </li>
        </Link>
      <div className="flex gap-4 justify-center items-center">
        <Bell/>
        <img src="/why.jpg" alt=""  className="object- h-[47px] w-[47px] rounded-full"/>
      </div>
      <h1 className="text-2xl font-medium">Username</h1>
      </ul>
      <div className="flex justify-center items-center mr-25">
      <Button className="hidden md:block text-xl pb-4">
        Logout
      </Button>
      </div>

      <button
        className="md:hidden flex items-cente w-1/3"
        onClick={() => setOpen(!open)}
      >
        {open ? <Cross /> : <Menu />}
      </button>
      {open && (
        <div className="absolute top-22 left-0 w-full bg-[#F8F9FA] shadow-lg py-6 flex flex-col gap-6 items-center z-50 list-none">
          <Link href={"/"}>
            <li className="playfair font-semibold text-xl cursor-pointer hover:underline ">
              HOME
            </li>
          </Link>

          <li className="playfair text-xl font-semibold cursor-pointer hover:underline">
            EVENTS
          </li>
          <li className="playfair text-xl font-semibold cursor-pointer hover:underline">
            UPLOAD CV
          </li>
          <Link href={"/findjobs"}>
           
            <li className="playfair font-semibold text-xl cursor-pointer hover:underline">
              FIND JOBS
            </li>
          </Link>
          <Button className="p-4 text-lg">Register/Login</Button>
        </div>
      )}
    </div>
  );
};
export default JobSeekerNavbar
"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "EVENTS", href: "/jobseeker/events" },
    { name: "UPLOAD CV", href: "/uploadcv" },
    { name: "FIND JOBS", href: "/findjobs" },
  ];

  return (
    <nav className="w-full bg-[#F8F9FA] text-black shadow-md font-playfair">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo + Title */}
          <div className="flex items-center gap-3 shrink-0">
            <img
              src="/Talent.png"
              alt="logo"
              className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 object-contain"
            />
            <h1 className="font-bold text-lg sm:text-xl md:text-2xl whitespace-nowrap ">
              TALENT LOOP
            </h1>
          </div>

          {/* Desktop Navigation - Fixed for medium & large screens */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex gap-6 lg:gap-10 items-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-semibold text-lg lg:text-xl nav-underline whitespace-nowrap"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

         
          <div className="hidden md:block shrink-0">
            <Button className="text-base lg:text-xl px-6 py-3">
              Register/Login
            </Button>
          </div>

         
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-200 transition"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#F8F9FA] border-t border-gray-200">
          <div className="px-4 pt-5 pb-8 flex flex-col gap-5 items-center text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-semibold text-lg sm:text-xl hover:underline whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
            <Button
              className="w-11/12 text-lg py-6"
              onClick={() => setOpen(false)}
            >
              Register/Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
"use client"
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Search } from "lucide-react";
import React, { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const locations = [
  "Kathmandu",
  "Biratnagar",
  "Itahari",
  "Pokhara",
  "Birgunj",
  "Lalitpur",
  "Bharatpur",
  "Janakpur",
  "Dharan",
  "Butwal",
];

const Searchbar = () => {
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState("");

  return (
    <div className="w-full max-w-[1110px] mx-auto px-4">
      <div className="border-4 border-gray-300 rounded-lg bg-white mt-10 overflow-hidden">
        <div className="p-4 sm:p-6 flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
          {/* Job Title Input */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Briefcase className="w-5 h-5 text-gray-600 shrink-0" />
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Job Title, Keyword..."
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Divider for mobile only (optional visual separator) */}
          <div className="block md:hidden border-t border-gray-300 -mx-4" />

          {/* Location Combobox */}
          <div className="flex items-center gap-3 flex-1 min-w-0 md:border-l md:border-gray-300 md:pl-4">
            <MapPin className="w-5 h-5 text-gray-600 shrink-0" />
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between h-12 px-4 text-left font-normal truncate border-gray-300"
                >
                  {selectedLocation || "Select Location..."}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] sm:w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search location..." className="h-10" />
                  <CommandList>
                    <CommandEmpty>No location found.</CommandEmpty>
                    <CommandGroup>
                      {locations.map((location) => (
                        <CommandItem
                          key={location}
                          value={location}
                          onSelect={() => {
                            setSelectedLocation(
                              selectedLocation === location ? null : location
                            );
                            setOpen(false);
                          }}
                        >
                          {location}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Search Button - No gap on mobile */}
          <div className="md:pl-10 flex justify-center md:justify-end">
            <Button
              size="lg"
              className="w-full md:w-auto h-12 px-8 text-base font-medium rounded-md"
            >
              Search Jobs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
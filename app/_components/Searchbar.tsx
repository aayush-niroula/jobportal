import { Button } from "@/components/ui/button";
import { Briefcase, MapPin } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Searchbar = () => {
  return (
    <div className="border-4 border-gray-300 w-full max-w-[1110px] flex flex-col items-center p-6 gap-8 mt-10 md:flex-row md:justify-between">
      <div className="flex gap-4 items-center w-full md:w-[40%]">
        <div className="border-black border-r-2 pr-4">
          <Briefcase />
        </div>
        <input
          type="text"
          placeholder="Job Title"
          className="border p-3 w-full rounded-md"
        />
      </div>

    
      <div className="flex items-center gap-3 w-full md:w-[35%]">
        <MapPin className="shrink-0" />

        <Select>
          <SelectTrigger className="w-full h-12 md:h-14 text-base md:text-lg">
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Location</SelectLabel>
              <SelectItem value="Kathmandu">Kathmandu</SelectItem>
              <SelectItem value="Biratnagar">Biratnagar</SelectItem>
              <SelectItem value="Itahari">Itahari</SelectItem>
              <SelectItem value="Pokhara">Pokhara</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

    
      <div className="w-full md:w-auto">
        <Button className="w-full md:w-auto h-12 md:h-14 px-8 text-base md:text-lg">
          Search
        </Button>
      </div>
    </div>
  );
};

export default Searchbar;

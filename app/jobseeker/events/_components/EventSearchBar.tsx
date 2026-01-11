"use client";
import { Button } from "@/components/ui/button";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const EventSearchBar = () => {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState(params.get("search") || "");
  const [category, setCategory] = useState(params.get("category") || "");

  const handleSearch = () => {
    const newParams = new URLSearchParams(params.toString());

    if (search) newParams.set("search", search);
    else newParams.delete("search");

    if (category) newParams.set("category", category);
    else newParams.delete("category");

    newParams.set("page", "1"); 
    router.push(`?${newParams.toString()}`);
    setSearch("")
    setCategory("")
  };

  return (
    <div className="w-full max-w-6xl mx-auto border border-gray-700 rounded-md p-3 flex flex-col gap-3 sm:flex-row sm:items-center">
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search events"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-10 w-full sm:flex-1 border border-black rounded-md px-3 text-sm"
      />

      {/* Category */}
      <NativeSelect
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-auto sm:w-44 border border-black rounded-md px-2 text-sm"
      >
        <NativeSelectOption value="">All events</NativeSelectOption>
        <NativeSelectOption value="Webinar">Webinar</NativeSelectOption>
        <NativeSelectOption value="Training">Training</NativeSelectOption>
        <NativeSelectOption value="Seminar">Seminar</NativeSelectOption>
      </NativeSelect>

      {/* Button */}
      <Button
        onClick={handleSearch}
        className="h-10 w-full sm:w-auto px-5 text-sm"
      >
        Search
      </Button>
    </div>
  );
};

export default EventSearchBar;

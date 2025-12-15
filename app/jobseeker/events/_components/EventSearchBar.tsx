import { Button } from "@/components/ui/button";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

const EventSearchBar = () => {
  return (
    <div className="w-full max-w-6xl mx-auto border border-gray-700 rounded-md p-3 flex flex-col gap-3 sm:flex-row sm:items-center">
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search events"
        className="h-10 w-full sm:flex-1 border border-black rounded-md px-3 text-sm"
      />

      {/* Select */}
      <NativeSelect className="w-auto sm:w-44 border border-black rounded-md px-2 text-sm ">
        <NativeSelectOption value="">All events</NativeSelectOption>
        <NativeSelectOption value="webinar">Webinar</NativeSelectOption>
        <NativeSelectOption value="training">Training</NativeSelectOption>
        <NativeSelectOption value="seminar">Seminar</NativeSelectOption>
      </NativeSelect>

      {/* Button */}
      <Button className="h-10 w-full sm:w-auto px-5 text-sm">
        Search
      </Button>
    </div>
  );
};

export default EventSearchBar;

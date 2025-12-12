import { Button } from "@/components/ui/button";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";
const EventSearchBar = () => {
  return (
    <div className="lg:max-h-[172px] lg:min-w-[1060px] w-auto md:w-auto border-4 border-gray-700 rounded-sm p-4 flex justify-around md:justify-between">
      <input type="text" className="border border-black p-2 lg:min-w-[539px] md:w-auto" />
      <NativeSelect>
        <NativeSelectOption value="">All events</NativeSelectOption>
        <NativeSelectOption value="apple">Webinar</NativeSelectOption>
        <NativeSelectOption value="banana">Training</NativeSelectOption>
        <NativeSelectOption value="blueberry">Seminar</NativeSelectOption>
        <NativeSelectOption value="grapes" disabled>
          Workshop
        </NativeSelectOption>
        <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
      </NativeSelect>
      <Button>Search</Button>
    </div>
  );
};

export default EventSearchBar;

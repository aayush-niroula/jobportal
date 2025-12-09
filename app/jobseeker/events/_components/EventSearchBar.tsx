import { Button } from "@/components/ui/button";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";
const EventSearchBar = () => {
  return (
    <div className="max-h-[172px] min-w-[1060px] border-4 border-gray-700 rounded-sm p-4 flex justify-around">
      <input type="text" className="border border-black p-2 min-w-[539px]" />
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

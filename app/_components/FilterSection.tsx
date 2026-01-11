"use client"
import { useRouter, useSearchParams } from "next/navigation";

export interface FilterOption {
  label: string;
  value: string; 
  count?: number; 
}
export interface FilterSectionProps {
  title: string;
  options: FilterOption[]
  showLocation?: boolean;
  queryKey?:string
  counts?:Record<string,number>
  value?:string
  count?:string
}

const FilterSection = ({
  title,
  options,
  showLocation = false,
  queryKey="field",
  counts= {}
}: FilterSectionProps) => {
    const router = useRouter();
  const params = useSearchParams();

  const selected = params.get(queryKey);

    const handleFilter = (value: string) => {
    const newParams = new URLSearchParams(params.toString());

    if (selected === value) {
      newParams.delete(queryKey); 
    } else {
      newParams.set(queryKey, value);
    }

    newParams.set("page", "1"); 
    router.push(`?${newParams.toString()}`);
  };
  return (
    <div
      className="
      w-full
      max-w-none
      lg:min-w-80
      lg:maz-w-96
        bg-white
        border border-black/80
        rounded-2xl
        font-playfair
        p-6          
        sm:p-8
        flex
        flex-col
        gap-7"
    >
      {showLocation && (
        <input
          type="text"
          placeholder="Location"
          className="p-2 border rounded-md w-full"
        />
      )}

      <h1 className="font-semibold text-lg">{title}</h1>

      <div className="flex flex-col gap-3">
        {options.map((item, index) => (
          <div key={index} className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <input
               type="checkbox" 
               checked ={selected === item.label}
               onChange={()=>handleFilter(item.label)}
               />
              <label>{item.label}</label>
            </div>

            <p className="bg-green-300 px-3 py-1 rounded-2xl">{counts[item.label] || 0 }</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;

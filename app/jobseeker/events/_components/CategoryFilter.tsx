"use client";
import { useRouter, useSearchParams } from "next/navigation";

interface CategoryFilterProps {
  categoryCounts?: Record<string, number>;
}
const categories = ["Career Fair", "Workshop", "Training", "Webinar"];

const CategoryFilter = ({categoryCounts={}}:CategoryFilterProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const selected = params.get("category");

  const handleCategory = (value: string) => {
    const newParams = new URLSearchParams(params.toString());

    if (selected === value) {
      newParams.delete("category"); 
    } else {
      newParams.set("category", value);
    }

    newParams.set("page", "1");
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="bg-white border border-black rounded-2xl p-6 flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Event Categories</h1>

      {categories.map((cat) => (
        <div
          key={cat}
          onClick={() => handleCategory(cat)}
          className={`p-3 border border-black w-full flex justify-between cursor-pointer
            ${selected === cat ? "bg-black text-white" : ""}`}
        >
          <p>{cat}</p>
          <span>{categoryCounts[cat] || 0}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;



interface FilterSectionProps {
  title: string;
  options: Array<{ label: string; count: number }>;
  showLocation?: boolean;
}

const FilterSection = ({ title, options, showLocation = false }: FilterSectionProps) => {
  return (
    <div className="min-w-[309px] bg-white border border-black rounded-2xl font-playfair p-4 flex flex-col gap-4">

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
          <div 
            key={index} 
            className="flex justify-between items-center w-full"
          >
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <label>{item.label}</label>
            </div>

            <p className="bg-green-300 px-3 py-1 rounded-2xl">
              {item.count}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default FilterSection;

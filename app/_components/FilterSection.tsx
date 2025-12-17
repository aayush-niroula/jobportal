interface FilterSectionProps {
  title: string;
  options: Array<{ label: string; count: number }>;
  showLocation?: boolean;
}

const FilterSection = ({
  title,
  options,
  showLocation = false,
}: FilterSectionProps) => {
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
              <input type="checkbox" />
              <label>{item.label}</label>
            </div>

            <p className="bg-green-300 px-3 py-1 rounded-2xl">{item.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;

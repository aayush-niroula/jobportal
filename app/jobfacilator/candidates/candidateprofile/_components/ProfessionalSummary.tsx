import React from "react";

const ProfessionalSummary = ({description}:{description:string}) => {
  return (
    <div className="p-6 lg:max-w-[788px] lg:min-h-[380px] h-auto font-playfair bg-white rounded-2xl border border-black flex flex-col gap-6 w-full">
      <h1 className="font-bold text-2xl">Professional Summary</h1>
      <p className="text-md font-light leading-8 ">
         {description}
      </p>
    </div>
  );
};

export default ProfessionalSummary;

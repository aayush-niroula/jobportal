import React from "react";

const VerificationRequired = () => {
  return (
    <div>
      <div className="lg:max-w-[1100px]  w-auto bg-white rounded-2xl border-3 border-blue-500 font-playfair flex flex-col gap-2 p-4">
        <h1 className="text-xl font-bold ">Verification Required</h1>
        <p className="text-sm font-light">
          Your company needs to be verified to post jobs and access candidate
          profiles. This process typically takes 2-3 business days.{" "}
        </p>
      </div>
    </div>
  );
};

export default VerificationRequired;

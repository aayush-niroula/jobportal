import React from "react";

const CompanyInformation = () => {
  return (
    <div className="bg-white w-full max-w-4xl mx-auto rounded-xl p-4 sm:p-6 lg:p-8">
      <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6">
        Company Information
      </h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm sm:text-base lg:text-lg font-medium mb-1">
            Company Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm sm:text-base lg:text-lg font-medium mb-1">
            Business Registration Number
          </label>
          <input
            type="text"
            className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm sm:text-base lg:text-lg font-medium mb-1">
              Company Email
            </label>
            <input
              type="text"
              className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base lg:text-lg font-medium mb-1">
              Company Phone
            </label>
            <input
              type="text"
              className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm sm:text-base lg:text-lg font-medium mb-1">
            Company Address
          </label>
          <input
            type="text"
            className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm sm:text-base lg:text-lg font-medium mb-1">
            Company Website Link
          </label>
          <input
            type="text"
            className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyInformation;

import { div } from "motion/react-client";

const VerificationProcess = () => {
  return (
    <div>
    <div className="max-w-[335px] mx-auto bg-white rounded-3xl border p-6 font-playfair">
      <h2 className="text-center text-xl font-semibold mb-6">Verification Process</h2>

      <div className="relative">

        <div className="absolute left-6 top-0 h-full w-[2px] bg-gray-200"></div>

       
        <div className="flex items-start mb-8">
          <div className="relative z-10 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-semibold">
            1
          </div>
          <div className="ml-4">
            <h3 className="font-semibold">Submit Documents</h3>
            <p className="text-sm text-gray-500">Upload required documents</p>
          </div>
        </div>

        <div className="flex items-start mb-8">
          <div className="relative z-10 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-semibold">
            2
          </div>
          <div className="ml-4">
            <h3 className="font-semibold">Under Review</h3>
            <p className="text-sm text-gray-500">2–3 business days</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="relative z-10 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-semibold">
            3
          </div>
          <div className="ml-4">
            <h3 className="font-semibold">Verified</h3>
            <p className="text-sm text-gray-500">full access gained</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default VerificationProcess;

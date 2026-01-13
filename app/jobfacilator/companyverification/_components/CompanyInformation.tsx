"use client";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";

interface CompanyInfo {
  company_name: string;
  registration_no: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  document_url:string;
  status:string
}

interface Props {
  setCompanyInfo: Dispatch<SetStateAction<CompanyInfo>>;
}

const CompanyInformation: React.FC<Props> = ({ setCompanyInfo }) => {
  const [localInfo, setLocalInfo] = useState<CompanyInfo>({
    company_name: "",
    registration_no: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    document_url:"",
    status:""
  });

  const user = useAuthStore((state) => state.user);


  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const res = await fetch("/api/jobfacilator/info", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setLocalInfo(data);
          setCompanyInfo(data); 
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCompanyInfo();
  }, [user?.token, setCompanyInfo]);

  const handleChange = (field: keyof CompanyInfo, value: string) => {
    setLocalInfo((prev) => {
      const updated = { ...prev, [field]: value };
      setCompanyInfo(updated); 
      return updated;
    });
  };

  return (
    <form className="bg-white w-full max-w-4xl mx-auto rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
      <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6">
        Company Information
      </h1>

    
      <div>
        <label className="block text-sm sm:text-base lg:text-lg font-medium mb-1">
          Company Name
        </label>
        <input
          type="text"
          value={localInfo.company_name ?? ""}
          onChange={(e) => handleChange("company_name", e.target.value)}
          className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>


      <div>
        <label className="block text-sm sm:text-base lg:text-lg font-medium mb-1">
          Business Registration Number
        </label>
        <input
          type="text"
          value={localInfo.registration_no ?? ""}
          onChange={(e) => handleChange("registration_no", e.target.value)}
          className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm sm:text-base lg:text-lg font-medium mb-1">
            Company Email
          </label>
          <input
            type="email"
            value={localInfo.email ?? ""}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base lg:text-lg font-medium mb-1">
            Company Phone
          </label>
          <input
            type="text"
            value={localInfo.phone ?? ""}
            onChange={(e) => handleChange("phone", e.target.value)}
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
          value={localInfo.address ?? ""}
          onChange={(e) => handleChange("address", e.target.value)}
          className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>


      <div>
        <label className="block text-sm sm:text-base lg:text-lg font-medium mb-1">
          Company Website Link
        </label>
        <input
          type="text"
          value={localInfo.website ?? ""}
          onChange={(e) => handleChange("website", e.target.value)}
          className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
        {localInfo.document_url && (
        <div className="mt-4">
          <p className="text-sm font-medium">Uploaded Document:</p>
          <a
            href={localInfo.document_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Document
          </a>
          {localInfo.status && (
            <p className="mt-1 text-sm font-medium">
              Verification Status: {localInfo.status}
            </p>
          )}
        </div>
      )}
    </form>
  );
};

export default CompanyInformation;

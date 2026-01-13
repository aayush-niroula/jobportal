"use client";
import { useAuthStore } from "@/app/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CompanyInfo {
  company_name: string;
  registration_no: string;
  email: string;
  phone: string;
  address: string;
  website: string;
}

interface Props {
  companyInfo: CompanyInfo;
}


const VerificationDocuments = ({ companyInfo }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(()=>{

  },[])
  const handleFileChange = (files: File[]) => {
    setFiles(files);
  };

    const submitVerification = async () => {
    if (files.length === 0) {
      toast.error("Please upload a document first");
      return;
    }

    setLoading(true);
    try {

      const formData = new FormData();
      formData.append("file", files[0]);

      const uploadRes = await fetch("/api/jobfacilator/upload-document", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      });

      const uploadData = await uploadRes.json();
      const document_url = uploadData.document_url;
      if (!document_url) throw new Error("Document upload failed");

      const body = {
        ...companyInfo,
        document_url,
      };

      const res = await fetch("/api/jobfacilator/verify", {
        method: "POST",
        headers: { 
          Authorization:`Bearer ${user?.token}`,
          "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log(data);
      
      if (res.ok) {
        toast.success("Company verification submitted successfully!");
      } else {
        toast.error(data.error || "Verification failed");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  

 
    

  return (
    <div className="w-full max-w-[755px] bg-white p-4 sm:p-6 md:p-8 rounded-2xl flex flex-col gap-4">
      <h1 className="sm:text-xl text-lg font-medium">Verification Documents</h1>
      <p className="text-sm font-light leading-relaxed">
        Please upload the following documents to verify your company. All documents should
        be clear, readable, and in PDF, JPG, or PNG format (max 5MB each).
      </p>

      <div className="border-2 border-dotted border-gray-400 rounded-xl p-4 sm:p-6 min-h-[150px] flex items-center justify-center">
        <FileUpload onChange={handleFileChange} />
      </div>

      <Button onClick={submitVerification} disabled={loading || files.length === 0}>
        {loading ? "Submitting..." : "Submit for Verification"}
      </Button>
    </div>
  );
};

export default VerificationDocuments;

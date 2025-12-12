"use client";
import { FileUpload } from "@/components/ui/file-upload";
import { useState } from "react";

const VerificationDocuments = () => {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };
  return (
    <div className=" w-full 
      max-w-[755px] 
      bg-white 
      p-4 
      sm:p-6 
      md:p-8 
      rounded-2xl 
      flex 
      flex-col 
      gap-4">
      <h1 className="sm:text-xl text-lg font-medium">Verification Documents</h1>
      <p className="text-sm font-light leading-relaxed">
        Please upload the following documents to verify your company. All
        documents should be clear, readable, and in PDF, JPG, or PNG format (max
        5MB each).
      </p>
      <div className=" border-2 
        border-dotted 
        border-gray-400 
        rounded-xl 
        p-4 
        sm:p-6
        min-h-[150px]
        flex 
        items-center 
        justify-center ">
        <FileUpload onChange={handleFileUpload} />
      </div>
    </div>
  );
};

export default VerificationDocuments;

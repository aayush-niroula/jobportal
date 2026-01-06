"use client";
import Footer from "@/app/_components/Footer";
import { Facilitator } from "@/app/types/types";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  BriefcaseBusiness,
  Building,
  Calendar,
  Globe,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ViewCompany = () => {
  const params = useParams();
  const id = params.id;
  const [company, setCompany] = useState<Facilitator | null>(null);
 

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      const res = await fetch(`/api/jobseeker/viewcompany/${id}`);

      const data = await res.json();

      console.log(data);
      setCompany(data.company);
    };

    fetchCompanyProfile();
  }, [id]);
  return (
    <div className="font-playfair px-4 sm:px-6 lg:px-10 py-10 space-y-10 bg-[#F1F5F9]">
      <div className="bg-white rounded-2xl p-6 sm:p-10 flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-10 max-w-[1248px] mx-auto border border-gray-200">
        <img
          src={company?.company_logo}
          alt="Company Logo"
          className="h-24 w-24 sm:h-28 sm:w-28 object-contain rounded-lg"
        />

        <div className="flex-1 flex flex-col gap-2 text-center lg:text-left">
          <h1 className="text-2xl font-medium">Udemy</h1>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin /> {company?.location}
            </div>
            <div className="flex items-center gap-1">
              <Users /> 100000-500000
            </div>
            <div className="flex items-center gap-1">
              <Phone /> 977 980000000
            </div>
            <div className="flex items-center gap-1">
              <Calendar /> Since {company?.founded_year}
            </div>
          </div>
        </div>

        <Button className="mt-4 lg:mt-0 py-2 px-4 sm:py-3 sm:px-6 flex items-center gap-2">
          Bookmark <Bookmark />
        </Button>
      </div>

      {/* Who We Are & Snapshot */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 max-w-[1248px] mx-auto">
        {/* Left: Who we are */}
        <div className="flex-1 bg-white rounded-2xl p-6 sm:p-10 flex flex-col gap-4">
          <h1 className="text-2xl font-medium">Who We Are?</h1>
          <p className="text-gray-700 text-sm sm:text-base">
            {company?.company_description ||
              " We are a multinational company based in Hong Kong focused on software and personal computers...Lenovo is determined to improve our planet and society by minimizing environmental impact and promoting social equity..."}
          </p>
        </div>

        {/* Right: Company Snapshot */}
        <div className="flex-1 bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 flex flex-col gap-4">
          <h1 className="text-2xl font-medium text-center">Company Snapshot</h1>
          {[
            { icon: Globe, label: "Industry", value: company?.industry },
            { icon: Building, label: "Website", value: company?.website_link },
            {
              icon: BriefcaseBusiness,
              label: "Department",
              value: company?.department,
            },
            { icon: MapPin, label: "Office", value: company?.location },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-1">
              <p className="flex items-center gap-2 font-bold text-lg">
                <item.icon className="w-5 h-5" /> {item.label}
              </p>
              <p className="text-gray-600">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features & Get in Touch */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 max-w-[1248px] mx-auto">
        {/* Features */}
        <div className="flex-1 bg-white rounded-2xl p-6 sm:p-10 flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-center">Features</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "Remote Friendly",
              "Flexible Hours",
              "Health Benefits",
              "Team Activities",
            ].map((feature, i) => (
              <div
                key={i}
                className="p-4 bg-white border border-gray-300 rounded-2xl text-center"
              >
                <h2 className="font-semibold text-lg">{feature}</h2>
                <p className="text-gray-600 text-sm">
                  remote friendly environment for work
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Get in Touch */}
        <div className="flex-1 bg-white rounded-2xl p-6 sm:p-10 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Get in Touch</h1>
          {[
            { label: "Full Name", type: "text" },
            { label: "Work Email", type: "email" },
            { label: "Message", type: "textarea" },
          ].map((field, i) => (
            <div key={i} className="flex flex-col gap-2">
              <label>{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  className="border border-gray-400 p-2 rounded-md w-full"
                  rows={4}
                />
              ) : (
                <input
                  type={field.type}
                  className="border border-gray-400 p-2 rounded-md w-full"
                />
              )}
            </div>
          ))}
          <div className="flex justify-center">
            <Button className="py-2 px-4 sm:py-3 sm:px-6">Send</Button>
          </div>
        </div>
      </div>

      {/* Inside Company & Location */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 max-w-[1248px] mx-auto">
        {/* Inside Company */}
        <div className="flex-1 bg-white rounded-2xl p-6 sm:p-10 flex flex-col gap-4">
          <h1 className="text-2xl font-medium">Inside Our Company</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Take a peek at some of our favourite moments inside the company
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {company?.gallery_images.map((image, i) => (
              <img
                key={i}
                src={image}
                alt="Company Moment"
                className="w-full h-32 sm:h-36 object-contain rounded-2xl border border-gray-300"
              />
            ))}
          </div>
        </div>

        {/* Location Map */}
        <div className="flex-1 bg-white rounded-2xl p-6 sm:p-10">
          <h1 className="text-2xl font-bold mb-4">Company Location</h1>
          {company?.company_location_link && (
            <a
              href={company.company_location_link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-64 sm:h-80 border border-gray-300 rounded-lg overflow-hidden"
            >
              <iframe
                src={company.company_location_link}
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </a>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewCompany;

"use client";
import { Button } from "@/components/ui/button";
import { CalendarRange, MapPin } from "lucide-react";
import React, { useState } from "react";
import EventForm from "./EventForm";
import EventLearnMore from "./EventLearnMore";

const EventCard = () => {
  const eventDetails = {
  title: "Career Fair 2026",
  description:
    "Career Fair 2026 brings together leading companies, startups, and industry experts under one roof. Participants will get the opportunity to explore job openings, attend skill-building workshops, interact directly with recruiters, and expand their professional network. This event is ideal for students, fresh graduates, and early-career professionals looking to grow their careers.",

  date: "January 5, 2026",
  time: "10:00 AM – 4:00 PM",
  location: "Biratnagar",
  capacity: 250,

  duration: "6 hours",
  category: "Career & Networking",
  organizer: "Nepal Career Network",
  price: "Free",

  prerequisites: [
    "Bring an updated CV (digital or printed)",
    "Basic understanding of your career interests",
    "Professional attire recommended",
  ],

  whatYouWillLearn: [
    "How to approach recruiters confidently",
    "Current job market trends in Nepal",
    "Effective CV and interview strategies",
    "How to build a strong professional network",
  ],

  agenda: [
    { time: "10:00 AM", activity: "Registration & Welcome Session" },
    { time: "10:30 AM", activity: "Company Booth Visits" },
    { time: "12:00 PM", activity: "Career Guidance Workshop" },
    { time: "01:30 PM", activity: "Lunch Break" },
    { time: "02:00 PM", activity: "Resume Review Session" },
    { time: "03:30 PM", activity: "Networking & Closing Remarks" },
  ],

  requirements: [
    "Valid registration confirmation",
    "Notebook or digital device for notes",
    "Positive attitude and willingness to network",
  ],
};

  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-black w-full flex flex-col-reverse lg:flex-row p-4 font-playfair gap-4 max-w-7xl mx-auto rounded-2xl">
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h1 className="font-bold text-xl sm:text-2xl">
            Event Name - Career Fair
          </h1>
          <div className="border border-black p-2 sm:p-3 rounded-sm w-fit text-sm sm:text-base">
            Workshop
          </div>
        </div>

        <div className="bg-[#FEEFEF] p-3 rounded-md">
          <p className="font-light text-sm sm:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            veniam consectetur vero neque consequatur consequuntur suscipit
            explicabo, eveniet libero voluptatum facere error totam itaque quis,
            labore perferendis aperiam? Minus, quibusdam.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
          <p className="flex items-center gap-2">
            <CalendarRange /> January 5, 2026
          </p>
          <p className="flex items-center gap-2">
            <MapPin /> 10AM-4PM
          </p>
          <p className="flex items-center gap-2">
            <MapPin /> Biratnagar
          </p>
          <p className="flex items-center gap-2">
            <MapPin /> 250 registered
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2">
          <EventForm />
          <EventLearnMore

           {...eventDetails}
          />
        </div>
      </div>

      {/* Image */}
      <div className="shrink-0 mt-4 lg:mt-0 lg:ml-4">
        <img
          src="/Logo.jpg"
          alt="Event Logo"
          className="object-cover w-full  max-w-50 rounded-2xl mx-auto lg:mx-0"
        />
      </div>
    </div>
  );
};

export default EventCard;

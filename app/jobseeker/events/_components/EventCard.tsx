"use client";
import { Button } from "@/components/ui/button";
import { CalendarRange, Clock, MapPin, Users } from "lucide-react";
import React, { useState, useEffect } from "react";
import EventForm from "./EventForm";
import EventLearnMore from "./EventLearnMore";
import { useAuthStore } from "@/app/store/useAuthStore";

interface EventProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    capacity: number;
    category?: string;
    image_url?: string;
    price: string;
    duration: string;
    whatYouWillLearn: string[];
    reqiurements: string[];
    prerequisites: string[];
    facilitator: {
      company_name: string;
    };
    registrations?: { user_id: string }[]; 
  };
}

const EventCard = ({ event }: EventProps) => {
  const user = useAuthStore((state) => state.user);
  const [isRegistered, setIsRegistered] = useState(false);
   const [registeredCount,setRegisteredCount] = useState(event.registrations?.length || 0)

    useEffect(() => {
    const checkRegistration = async () => {
      try {
        const res = await fetch(`/api/events/register?eventId=${event.id}`,{
          method:"GET",
          headers:{
            Authorization:`Bearer ${user?.token}`,
            "Content-Type":"application/json"
          }
        });
        const data = await res.json();
        if (res.ok) setIsRegistered(data.registered);
      } catch (err) {
        console.error(err);
      }
    };
    checkRegistration();
  }, [event.id,user]);


 
  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
    setRegisteredCount(prev =>prev +1 )
  };

  return (
    <div className="bg-white border border-black w-full flex flex-col-reverse lg:flex-row p-4 font-playfair gap-4 max-w-7xl mx-auto rounded-2xl">
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h1 className="font-bold text-xl sm:text-2xl">{event.title}</h1>
          <div className="border border-black p-2 sm:p-3 rounded-sm w-fit text-sm sm:text-base">
            {event.category}
          </div>
        </div>

        <div className="bg-[#FEEFEF] p-3 rounded-md">
          <p className="font-light text-sm sm:text-base">{event.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
          <p className="flex items-center gap-2">
            <CalendarRange /> {new Date(event.date).toDateString()}
          </p>
          <p className="flex items-center gap-2">
            <Clock /> {event.time}
          </p>
          <p className="flex items-center gap-2">
            <MapPin /> {event.location}
          </p>
          <p className="flex items-center gap-2">
            <Users /> {registeredCount}/ {event.capacity} registered
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2">
          <EventForm
            eventId={event.id}
            isRegistered={isRegistered} 
            onSuccess={handleRegistrationSuccess}
          />
          <EventLearnMore
            title={event.title}
            date={event.date}
            description={event.description}
            location={event.location}
            time={event.time}
            prerequisites={event.prerequisites}
            capacity={event.capacity}
            category={event.category}
            duration={event.duration}
            requirements={event.reqiurements}
            price={event.price}
            whatYouWillLearn={event.whatYouWillLearn}
          />
        </div>
      </div>

      {/* Image */}
      <div className="shrink-0 mt-4 lg:mt-0 lg:ml-4">
        <img
          src={event.image_url}
          alt="Event Logo"
          className="object-cover w-full max-w-50 rounded-2xl mx-auto lg:mx-0"
        />
      </div>
    </div>
  );
};

export default EventCard;

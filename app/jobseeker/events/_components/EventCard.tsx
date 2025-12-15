import { Button } from '@/components/ui/button';
import { CalendarRange, MapPin } from 'lucide-react';
import React from 'react';

const EventCard = () => {
  return (
    <div className="bg-white border border-black w-full flex flex-col-reverse lg:flex-row p-4 font-playfair gap-4 max-w-7xl mx-auto rounded-2xl">
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h1 className="font-bold text-xl sm:text-2xl">Event Name - Career Fair</h1>
          <div className="border border-black p-2 sm:p-3 rounded-sm w-fit text-sm sm:text-base">Workshop</div>
        </div>

       
        <div className="bg-[#FEEFEF] p-3 rounded-md">
          <p className="font-light text-sm sm:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto veniam consectetur vero neque consequatur consequuntur suscipit explicabo, eveniet libero voluptatum facere error totam itaque quis, labore perferendis aperiam? Minus, quibusdam.
          </p>
        </div>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
          <p className="flex items-center gap-2"><CalendarRange /> January 5, 2026</p>
          <p className="flex items-center gap-2"><MapPin /> 10AM-4PM</p>
          <p className="flex items-center gap-2"><MapPin /> Biratnagar</p>
          <p className="flex items-center gap-2"><MapPin /> 250 registered</p>
        </div>

      
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2">
          <Button className="w-full sm:w-auto py-2 sm:py-3 px-4">Register</Button>
          <Button variant="outline" className="w-full sm:w-auto border-black py-2 sm:py-3 px-4">Learn More</Button>
        </div>

      </div>

      {/* Image */}
      <div className="shrink-0 mt-4 lg:mt-0 lg:ml-4">
        <img 
          src="/Logo.jpg" 
          alt="Event Logo" 
          className="object-cover w-full max-w-37 max-w-50 rounded-2xl mx-auto lg:mx-0" 
        />
      </div>

    </div>
  );
};

export default EventCard;

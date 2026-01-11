"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarRangeIcon, Clock, Info, MapPin, Sparkles, Tag, User, Users } from "lucide-react";

type EventLearnMoreProps = {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity?: number;
  duration?: string;
  category?: string;
  organizer?: string;
  price?: string;
  prerequisites?: string[];
  whatYouWillLearn?: string[];
  agenda?: { time: string; activity: string }[];
  requirements?: string[];
};

const EventLearnMore = ({
  title,
  description,
  date,
  time,
  location,
  capacity,
  duration = "2 hours",
  category = "Workshop",
  organizer = "Event Team",
  price = "Free",
  prerequisites = [],
  whatYouWillLearn = [],
  agenda = [],
  requirements = [],
}: EventLearnMoreProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="group relative overflow-hidden border-2 border-black transition-all duration-300 hover:shadow-lg hover:scale-105">
          <span className="relative z-10 flex items-center gap-2">
            Learn More
            <Sparkles size={16} className="group-hover:rotate-12 transition-transform duration-300" />
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto border-gray-200 shadow-2xl">
        <DialogHeader className="space-y-3 pb-4 border-b-2 border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-2xl font-bold bg-linear-to-r from-slate-600 to-slate-900 bg-clip-text text-transparent leading-tight">
              {title}
            </DialogTitle>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full whitespace-nowrap">
              {category}
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Calendar section */}
            <div className="flex items-start gap-3 p-4 bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 transition-all duration-300 hover:shadow-md hover:scale-105">
              <div className="p-2 bg-slate-600 rounded-lg">
                <CalendarRangeIcon size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">When</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{date}</p>
                <p className="text-xs text-gray-600">{time}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3 p-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 transition-all duration-300 hover:shadow-md hover:scale-105">
              <div className="p-2 bg-slate-600 rounded-lg">
                <MapPin size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase font-semibold text-gray-500 tracking-wide">Where</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{location}</p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-start gap-3 p-4 bg-linear-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100 transition-all duration-300 hover:shadow-md hover:scale-105">
              <div className="p-2 bg-slate-600 rounded-lg">
                <Clock size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Duration</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{duration}</p>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-start gap-3 p-4 bg-linear-to-br from-rose-50 to-pink-50 rounded-xl border border-rose-100 transition-all duration-300 hover:shadow-md hover:scale-105">
              <div className="p-2 bg-slate-600 rounded-lg">
                <Tag size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Price</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{price}</p>
              </div>
            </div>

            {/* Capacity */}
            {capacity && (
              <div className="flex items-start gap-3 p-4 bg-linear-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100 transition-all duration-300 hover:shadow-md hover:scale-105">
                <div className="p-2 bg-slate-600 rounded-lg">
                  <Users size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Capacity</p>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">{capacity} participants</p>
                </div>
              </div>
            )}

            {/* Organizer */}
            <div className="flex items-start gap-3 p-4 bg-linear-to-br from-cyan-50 to-sky-50 rounded-xl border border-cyan-100 transition-all duration-300 hover:shadow-md hover:scale-105">
              <div className="p-2 bg-slate-600 rounded-lg">
                <User size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Organizer</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{organizer}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="relative">
            <div className="absolute -left-2 top-0 bottom-0 w-1  rounded-full"></div>
            <div className="bg-linear-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 ml-2">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Info size={14} /> About This Event
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">{description}</p>
            </div>
          </div>

          {/* What You Will Learn */}
          {whatYouWillLearn.length > 0 && (
            <div className="bg-linear-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                <Sparkles size={16} className="text-slate-600" />
                What You'll Learn
              </h3>
              <ul className="space-y-2">
                {whatYouWillLearn.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-slate-600 font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Event Agenda */}
          {agenda.length > 0 && (
            <div className="bg-linear-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                <Clock size={16} className="text-slate-600" />
                Event Agenda
              </h3>
              <div className="space-y-3">
                {agenda.map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <span className="text-xs font-bold text-slate-700 bg-blue-100 px-3 py-1 rounded-full whitespace-nowrap">
                      {item.time}
                    </span>
                    <p className="text-sm text-gray-700 flex-1">{item.activity}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prerequisites */}
          {prerequisites.length > 0 && (
            <div className="bg-linear-to-br from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-200">
              <h3 className="text-sm font-bold text-slate-700 mb-4">Prerequisites</h3>
              <ul className="space-y-2">
                {prerequisites.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-slate-600 font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {requirements.length > 0 && (
            <div className="bg-linear-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-sm font-bold text-slate-700 mb-4">What to Bring</h3>
              <ul className="space-y-2">
                {requirements.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-slate-600 font-bold mt-0.5">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventLearnMore;
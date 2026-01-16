"use client";

import { useEffect, useState } from "react";
import { EventForm, EventType } from "./Eventform";
import { useAuthStore } from "@/app/store/useAuthStore";
import { CalendarDays, MapPin, Pencil, PlusCircle, Trash2, Users } from "lucide-react";


export const FacilitatorEventsPage = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);
  const [showForm, setShowForm] = useState(false);
  const user = useAuthStore(state =>state.user)

  useEffect(()=>{
    const fetchEvents = async () => {
    const res = await fetch("/api/events/userevents",{
      method:"GET",
      headers:{
        Authorization:`Bearer ${user?.token}`,
        "Content-Type":"application/json"
      }
    });
    const data = await res.json(); 
    console.log(data);
    if(!res.ok) {
      console.error(data.error)
      setEvents([])
    }
    
    setEvents(data.events);
  };
  fetchEvents()
  },[user?.token])



  const handleEdit = (event: EventType) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch("/api/events/register", {
        method: "DELETE",
        headers: {
          Authorization:`Bearer ${user?.token}`,
           "Content-Type": "application/json" 
          },
        body: JSON.stringify({ eventId: id }),
      });
      if (!res.ok) throw new Error("Failed to delete event");

       setEvents((prev) => prev.filter((e) => e.id !== id));
    
    } catch (err) {
      console.log(err)
      alert("Error deleting event");
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  return (
 <div className="p-6">

      {/* CREATE BUTTON */}
      <button
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 
        text-white px-4 py-2 rounded-lg shadow transition"
        onClick={() => setShowForm(true)}
      >
        <PlusCircle size={20} />
        Create Event
      </button>

      {showForm && (
        <EventForm
          event={editingEvent || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* EVENT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {events.map(ev => (
          <div
            key={ev.id}
            className={`relative border rounded-xl shadow-md 
            hover:shadow-xl transition duration-300 p-5 bg-white
            ${ev.isMine ? "border-green-500" : "border-gray-200"}`}
          >
            {ev.isMine && (
              <span className="absolute top-3 right-3 
              bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                My Event
              </span>
            )}

            {/* IMAGE */}
            {ev.image_url && (
              <img
                src={ev.image_url}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
            )}

            {/* TITLE */}
            <h3 className="font-bold text-xl mb-1">{ev.title}</h3>
            <p className="text-sm text-gray-600 mb-3">
              {ev.description}
            </p>

            {/* DETAILS */}
            <div className="space-y-2 text-sm text-gray-700">

              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                {new Date(ev.date).toDateString()} | {ev.time}
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {ev.location}
              </div>

              <div className="flex items-center gap-2">
                <Users size={16} />
                Capacity: {ev.capacity}
              </div>

              <p className="text-xs text-gray-500">
                By {ev.facilitator?.company_name}
              </p>
            </div>

            {/* ACTIONS */}
            {ev.isMine && (
              <div className="flex gap-3 mt-4">
                <button
                  className="flex items-center gap-1 bg-blue-500 
                  hover:bg-blue-600 text-white px-3 py-1.5 
                  rounded-md text-sm transition"
                  onClick={() => handleEdit(ev)}
                >
                  <Pencil size={14} />
                  Edit
                </button>

                <button
                  className="flex items-center gap-1 bg-red-500 
                  hover:bg-red-600 text-white px-3 py-1.5 
                  rounded-md text-sm transition"
                  onClick={() => handleDelete(ev.id!)}
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

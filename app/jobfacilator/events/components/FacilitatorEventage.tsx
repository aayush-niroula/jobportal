"use client";

import { useEffect, useState } from "react";
import { EventForm, EventType } from "./Eventform";


export const FacilitatorEventsPage = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchEvents = async () => {
    const res = await fetch("/api/events");
    const data = await res.json(); 
    setEvents(data.events || []);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = (event: EventType) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch("/api/events/register", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: id }),
      });
      if (!res.ok) throw new Error("Failed to delete event");
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert("Error deleting event");
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingEvent(null);
    fetchEvents();
  };

  return (
    <div className="p-4">
      <button
        className="bg-green-500 text-white p-2 rounded mb-4"
        onClick={() => setShowForm(true)}
      >
        Create New Event
      </button>

      {showForm && (
        <EventForm
          event={editingEvent || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events?.map((ev) => (
          <div key={ev.id} className="border p-4 rounded shadow-md">
            <h3 className="font-bold text-lg">{ev.title}</h3>
            <p>{ev.description}</p>
            <p>
              {ev.date} | {ev.time} | {ev.location}
            </p>
            <p>Capacity: {ev.capacity}</p>
            <p>Facilitator: {ev.facilitator?.company_name}</p>
            {ev.image_url && <img src={ev.image_url} className="w-full h-40 object-cover my-2" />}
            <div className="flex gap-2 mt-2">
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => handleEdit(ev)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => handleDelete(ev.id!)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

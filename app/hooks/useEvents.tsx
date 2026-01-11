"use client";

import { useEffect, useState } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  category?: string;
  field?:string;
  image_url?:string;
  price:string,
  duration:string
  whatYouWillLearn:string[],
  reqiurements:string[]
  prerequisites:string[]
  facilitator:{
    company_name:string
  }
}

export const useEvents = (params: {
  search?: string;
  category?: string;
  page?: number;
  field?:string
}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
const [categoryCounts, setCategoryCounts] = useState({});
  const [fieldCounts, setFieldCounts] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const query = new URLSearchParams({
          ...(params.search && { search: params.search }),
          ...(params.category && { category: params.category }),
          ...(params.page && { page: String(params.page) }),
          ...(params.field && {field:params.field})
        });

        const res = await fetch(`/api/events?${query}`);

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        setEvents(data.events);
        setTotalPages(data.totalPages);
        setCategoryCounts(data.categoryCounts)
        setFieldCounts(data.fieldCounts)
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [params.search, params.category, params.page,params.field]);

  return {
    events,
    loading,
    error,
    totalPages,
    categoryCounts,
    fieldCounts
  };
};

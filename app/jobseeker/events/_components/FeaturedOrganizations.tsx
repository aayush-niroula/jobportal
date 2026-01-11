"use client";
import { useEffect, useState } from "react";

interface Org {
  id: string;
  company_name: string;
  company_logo?: string | null;
  _count: {
    events: number;
  };
}

export default function FeaturedOrganizations() {
  const [orgs, setOrgs] = useState<Org[]>([]);

  useEffect(() => {
    fetch("/api/events/organizations")
      .then(res => res.json())
      .then(setOrgs);
  }, []);

  return (
    <div className="bg-white border border-black rounded-2xl p-4">
      <h1 className="text-2xl sm:text-3xl font-medium text-center mb-4">
        Featured Organizations
      </h1>

      {orgs.map(org => (
        <div
          key={org.id}
          className="flex items-center gap-4 p-4 border-b last:border-b-0"
        >
          <img
            src={org.company_logo || "/Logo.jpg"}
            alt="logo"
            className="h-[60px] w-[60px] sm:h-[73px] sm:w-[73px] rounded-full object-contain"
          />

          <div className="flex flex-col gap-1">
            <h2 className="font-medium text-lg sm:text-xl">
              {org.company_name}
            </h2>

            <p className="text-sm font-light">
              {org._count.events} events
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

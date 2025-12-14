"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MyApplicationsPage() {
  const applications = [
    {
      id: "1",
      jobTitle: "Frontend Developer",
      company: "Acme Corp",
      location: "Kathmandu, Nepal",
      appliedAt: "Dec 10, 2025",
      status: "Applied",
      summary: "Work on UI components using React and TailwindCSS.",
    },
    {
      id: "2",
      jobTitle: "UI/UX Designer",
      company: "Design Studio",
      location: "Remote",
      appliedAt: "Dec 01, 2025",
      status: "Interview",
      summary: "Design flows and wireframes for mobile apps.",
    },
    {
      id: "3",
      jobTitle: "Backend Developer",
      company: "Tech Labs",
      location: "Lalitpur, Nepal",
      appliedAt: "Nov 28, 2025",
      status: "Screening",
      summary: "Build REST APIs using Node.js.",
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-slate-50 font-playfair">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Applications</h1>

        <div className="grid gap-4">
          {applications.map((app) => (
            <Card key={app.id} className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">{app.jobTitle}</h2>
                      <p className="text-sm text-slate-600">
                        {app.company} • {app.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{app.appliedAt}</p>
                      <p className="text-sm mt-1 font-medium">{app.status}</p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-slate-700">{app.summary}</p>

                  <div className="mt-4 flex gap-2">
                    <Button size="sm">View</Button>
                    <Button size="sm" variant="ghost">Withdraw</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

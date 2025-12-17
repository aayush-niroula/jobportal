"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Building,
  Calendar,
  MapPin,
  DollarSign,
  Briefcase,
  ExternalLink,
  Filter,
} from "lucide-react";
import { ApplicationDetailsDialog } from "./ApplicationDetailsDialog";
import Information from "../../components/Information";

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState([
    {
  id: "1",
  jobTitle: "Frontend Developer",
  company: "Tech Solutions Inc.",
  location: "Kathmandu, Nepal",
  appliedAt: "2025-12-01",
  status: "Under Review",
  summary: "Applied for the frontend developer position to work on React-based projects.",
  salaryRange: "₹50,000 - ₹70,000/month",
  jobType: "Full-time",
  experienceLevel: "Mid-level",
  contactPerson: "Sanjay Shrestha",
  contactEmail: "sanjay@techsolutions.com",
  contactPhone: "+977-9801234567",
  jobDescription: "Develop and maintain web applications using React, TypeScript, and Tailwind CSS.",
  requirements: [
    "3+ years of experience in frontend development",
    "Proficient in React and TypeScript",
    "Experience with REST APIs and GraphQL",
    "Good communication skills"
  ],
  nextSteps: "HR will contact you for a technical interview within 1 week.",
  interviewDate: "2025-12-20",
  notes: "Portfolio link included in the application.",
  applicationMethod: "Online portal",
  jobPostingLink: "https://techsolutions.com/jobs/frontend-developer"
    },
    {
      id: "2",
      jobTitle: "UI/UX Designer",
      company: "Design Studio",
      location: "Remote",
      appliedAt: "Dec 01, 2025",
      status: "Screening",
      summary: "Design flows and wireframes for mobile apps.",
      salaryRange: "$70,000 - $90,000",
      jobType: "Full-time",
      experienceLevel: "Senior",
      nextSteps: "HR screening scheduled",
  
      jobPostingLink: "https://designstudio.com/jobs/ui-ux-designer",
    },
    {
      id: "3",
      jobTitle: "Backend Developer",
      company: "Tech Labs",
      location: "Lalitpur, Nepal",
      appliedAt: "Nov 28, 2025",
      status: "Interview",
      summary: "Build REST APIs using Node.js.",
      salaryRange: "$75,000 - $95,000",
      jobType: "Full-time",
      experienceLevel: "Mid-level",
      nextSteps: "Technical interview tomorrow",
      jobPostingLink: "https://techlabs.com/careers/backend-dev",
    },
  ]);

  const [statusFilter, setStatusFilter] = useState("all");

  const filteredApplications =
    statusFilter === "all"
      ? applications
      : applications.filter((a) => a.status === statusFilter);

  const handleWithdraw = (id: string, title: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    toast.warning("Application withdrawn", {
      description: `You withdrew from ${title}`,
    });
  };

  const stats = {
    total: applications.length,
    applied: applications.filter((a) => a.status === "Applied").length,
    screening: applications.filter((a) => a.status === "Screening").length,
    interview: applications.filter((a) => a.status === "Interview").length,
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">My Applications</h1>
          <p className="text-muted-foreground">
            Track and manage your job applications
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-2 md:gap-2 lg:grid-cols-4 gap-4">
          <Information title="Total Applications" number={stats.total} lastline="Total" />
          <Information title="Applied" number={stats.applied} lastline="Applied" />
          <Information title="Interview" number={stats.interview} lastline="Interview" />
          <Information title="Screening" number={stats.screening} lastline="Screening" />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Filter size={18} />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Applied">Applied</SelectItem>
                <SelectItem value="Screening">Screening</SelectItem>
                <SelectItem value="Interview">Interview</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="text-sm text-muted-foreground">
            Showing {filteredApplications.length} of {applications.length}
          </p>
        </div>

        {/* Applications */}
        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <Card key={app.id} className="hover:shadow-md transition">
              <CardContent className="p-4 sm:p-6 space-y-4">
                {/* Top */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-lg border shadow-md">
                      <Building className="" />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold">
                        {app.jobTitle}
                      </h2>
                      <div className="mt-1 flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building size={14} /> {app.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} /> {app.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col sm:items-end gap-2">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      {app.appliedAt}
                    </span>

                    <Badge
                      variant={
                        app.status === "Applied"
                          ? "secondary"
                          : app.status === "Screening"
                          ? "outline"
                          : "default"
                      }
                    >
                      {app.status}
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Meta */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign size={14} />
                    {app.salaryRange}
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={14} />
                    {app.experienceLevel}
                  </div>
                  <Badge variant="outline">{app.jobType}</Badge>
                </div>

                {/* Summary */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {app.summary}
                </p>

                {/* Next Steps */}
                {app.nextSteps && (
                  <div className="rounded-md bg-blue-50 p-2 text-sm">
                    <strong>Next:</strong> {app.nextSteps}
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <ApplicationDetailsDialog application={app} />

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleWithdraw(app.id, app.jobTitle)}
                  >
                    Withdraw
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredApplications.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              No applications found
            </p>
            <Button onClick={() => setStatusFilter("all")}>
              View All
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

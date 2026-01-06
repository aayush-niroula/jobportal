"use client";
import React, { useEffect, useState } from "react";
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
import { useAuthStore } from "@/app/store/useAuthStore";
import { Application } from "@/app/types/types";

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);

  const [statusFilter, setStatusFilter] = useState("all");
  const user = useAuthStore(state =>state.user)

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
    total: applications?.length,
    applied: applications?.filter((a) => a.status === "PENDING").length,
    screening: applications?.filter((a) => a.status === "SCREENING").length,
    interview: applications?.filter((a) => a.status === "INTERVIEW").length,
  };

  useEffect(()=>{
    const fetchAllApplications = async()=>{
      const res = await fetch("/api/jobseeker/myapplications",
        {
          method:"GET",
          headers:{
            Authorization:`Bearer ${user?.token}`,
            "Content-Type":"application/json"
          }
        }
      )

      const data = await res.json()
      setApplications(data.application)
      console.log(data);
      
    }
    fetchAllApplications()
  },[user?.token])

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
                <SelectItem value="PENDING">Applied</SelectItem>
                <SelectItem value="SCREENING">Screening</SelectItem>
                <SelectItem value="INTERVIEW">Interview</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="text-sm text-muted-foreground">
            Showing {filteredApplications?.length} of {applications?.length}
          </p>
        </div>

        {/* Applications */}
        <div className="space-y-4">
          {applications?.map((app) => (
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
                        {app.job.job_name}
                      </h2>
                      <div className="mt-1 flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building size={14} /> {app.job?.facilitator?.company_name}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} /> {app.job.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col sm:items-end gap-2">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar size={14} />
                     {new Date(app.appliedAt).toLocaleDateString()}

                    </span>

                    <Badge
                      variant={
                        app.status === "PENDING"
                          ? "secondary"
                          : app.status === "SCREENING"
                          ? "outline"
                          : "default"
                      }
                    >
                      {app.status}
                    </Badge>
                  </div>
                </div>

                <Separator />

              
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign size={14} />
                    {app?.job?.salary_min }- {app?.job?.salary_max}
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={14} />
                    {app.job.experience_level}
                  </div>
                  <Badge variant="outline">{app.job.job_type}</Badge>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {app?.message}
                </p>

             
              

             
                <div className="flex flex-wrap gap-2">
                  <ApplicationDetailsDialog application={app} />

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleWithdraw(app.id, app.job.job_name)}
                  >
                    Withdraw
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>


        {filteredApplications?.length === 0 && (
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

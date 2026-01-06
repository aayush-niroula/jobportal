"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Building, Clock, Mail, Phone, FileText, Users, DollarSign, Briefcase } from "lucide-react";
import { Application } from "@/app/types/types";



export function ApplicationDetailsDialog({
  application,
}: {
  application: Application;
}) {
  const statusColors: Record<string, string> = {
    PENDING: "bg-blue-100 text-blue-800",
    SCREENING: "bg-yellow-100 text-yellow-800",
    INTERVIEW: "bg-purple-100 text-purple-800",
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">View Details</Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between font-playfair">
            <div>
              <DialogTitle className="text-2xl font-bold">
                {application.job.job_name}
              </DialogTitle>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Building size={16} />
                  <span>{application.job.facilitator.company_name}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin size={16} />
                  <span>{application.job.location}</span>
                </div>
              </div>
            </div>
            <Badge 
              className={`${statusColors[application.status] || "bg-gray-100 text-gray-800"}`}
            >
              {application.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Application Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium flex items-center gap-2">
                  <Calendar size={16} />
                  Applied On
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(application.appliedAt).toLocaleString()}
                </p>
              </div>

              {application?.interviews?.scheduled_at && (
                <div>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Clock size={16} />
                    Next Interview
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {application.interviews.scheduled_at}
                  </p>
                </div>
              )}

              {application.job.job_type && (
                <div>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Briefcase size={16} />
                    Job Type
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {application.job.job_type}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {application.job.salary_max && (
                <div>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <DollarSign size={16} />
                    Salary Range
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {application.job.salary_min}-{application.job.salary_max}
                  </p>
                </div>
              )}

              {application.job.experience_level && (
                <div>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Users size={16} />
                    Experience Level
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {application.job.experience_level}
                  </p>
                </div>
              )}

            </div>
          </div>

          {/* Contact Information */}
          {(application?.job?.facilitator?.user?.email ) && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-blue-50 rounded-lg">
                {application.job.facilitator.user.name && (
                  <div>
                    <p className="text-sm font-medium">Contact Person</p>
                    <p className="text-sm text-muted-foreground">
                      {application?.job?.facilitator.user.name}
                    </p>
                  </div>
                )}
                {application.job.facilitator.user.email && (
                  <div>
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Mail size={16} />
                      Email
                    </p>
                    <a 
                      href={`mailto:${application.job.facilitator.user.email}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {application.job.facilitator.user.email}
                    </a>
                  </div>
                )}
                {application.job.facilitator.user.phone && (
                  <div>
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Phone size={16} />
                      Phone
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {application.job.facilitator.user.phone}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Job Description */}
          {application.job.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Job Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {application.job.description}
              </p>
            </div>
          )}

          {/* Requirements */}
          {application.job.requirements && application.job.requirements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Requirements</h3>
              <ul className="space-y-1">
                {application?.job?.requirements?.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Notes */}
          {application.message && (
            <div>
              <h3 className="text-lg font-semibold mb-2">My Notes</h3>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-muted-foreground italic">{application.message}</p>
              </div>
            </div>
          )}

          {/* Actions */}
         
            <div className="flex gap-2">
              <Button variant="ghost">Close</Button>
            </div>
          </div>
      </DialogContent>
    </Dialog>
  );
}
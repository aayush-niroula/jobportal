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

type Application = {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedAt: string;
  status: string;
  summary: string;
  salaryRange?: string;
  jobType?: string;
  experienceLevel?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  jobDescription?: string;
  requirements?: string[];
  nextSteps?: string;
  interviewDate?: string;
  notes?: string;
  applicationMethod?: string;
  jobPostingLink?: string;
};

export function ApplicationDetailsDialog({
  application,
}: {
  application: Application;
}) {
  const statusColors: Record<string, string> = {
    Applied: "bg-blue-100 text-blue-800",
    Screening: "bg-yellow-100 text-yellow-800",
    Interview: "bg-purple-100 text-purple-800",
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
                {application.jobTitle}
              </DialogTitle>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Building size={16} />
                  <span>{application.company}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin size={16} />
                  <span>{application.location}</span>
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
                  {application.appliedAt}
                </p>
              </div>

              {application.interviewDate && (
                <div>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Clock size={16} />
                    Next Interview
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {application.interviewDate}
                  </p>
                </div>
              )}

              {application.jobType && (
                <div>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Briefcase size={16} />
                    Job Type
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {application.jobType}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {application.salaryRange && (
                <div>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <DollarSign size={16} />
                    Salary Range
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {application.salaryRange}
                  </p>
                </div>
              )}

              {application.experienceLevel && (
                <div>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Users size={16} />
                    Experience Level
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {application.experienceLevel}
                  </p>
                </div>
              )}

              {application.applicationMethod && (
                <div>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <FileText size={16} />
                    Applied Via
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {application.applicationMethod}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          {(application.contactPerson || application.contactEmail || application.contactPhone) && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-blue-50 rounded-lg">
                {application.contactPerson && (
                  <div>
                    <p className="text-sm font-medium">Contact Person</p>
                    <p className="text-sm text-muted-foreground">
                      {application.contactPerson}
                    </p>
                  </div>
                )}
                {application.contactEmail && (
                  <div>
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Mail size={16} />
                      Email
                    </p>
                    <a 
                      href={`mailto:${application.contactEmail}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {application.contactEmail}
                    </a>
                  </div>
                )}
                {application.contactPhone && (
                  <div>
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Phone size={16} />
                      Phone
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {application.contactPhone}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Job Description */}
          {application.jobDescription && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Job Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {application.jobDescription}
              </p>
            </div>
          )}

          {/* Requirements */}
          {application.requirements && application.requirements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Requirements</h3>
              <ul className="space-y-1">
                {application.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Next Steps */}
          {application.nextSteps && (
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
              <p className="text-sm">{application.nextSteps}</p>
            </div>
          )}

          {/* Notes */}
          {application.notes && (
            <div>
              <h3 className="text-lg font-semibold mb-2">My Notes</h3>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-muted-foreground italic">{application.notes}</p>
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
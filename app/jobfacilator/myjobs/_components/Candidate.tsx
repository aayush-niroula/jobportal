"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useSocket } from "@/app/providers/SocketProvider";
import { Calendar, Video, Phone, Building2, Eye, CheckCircle2, XCircle, Clock } from "lucide-react";

interface CandidateProps {
  name: string;
  skills: string[];
  status: "PENDING" | "SCREENING" | "REJECTED" | "INTERVIEW";
  applicationId: string;
  jobseekerId: string;
}

const Candidate = ({ name, skills, status, applicationId, jobseekerId }: CandidateProps) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [open, setOpen] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const user = useAuthStore(state => state.user);
  const [notes, setNotes] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [type, setType] = useState("ONLINE");
  const router = useRouter();
  const socket = useSocket();

  const updateStatus = async (newStatus: typeof status) => {
    const res = await fetch("/api/jobseeker/myapplications/status", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ applicationId, status: newStatus }),
    });

    if (!res.ok) {
      toast.error("Failed to update status");
      return;
    }

    setCurrentStatus(newStatus);
    toast.success(`Status updated to ${newStatus}`);

    socket?.emit("send-notification", {
      userId: jobseekerId,
      notification: {
        message: `Your application status changed to ${newStatus}`,
        type: "STATUS",
        created_at: new Date(),
        applicationId
      }
    });
  };

  const scheduleInterview = async () => {
    if (!dateTime) {
      toast.error("Please select interview date & time");
      return;
    }

    if (type === "ONLINE" && !meetingLink) {
      toast.error("Meeting link is required for online interview");
      return;
    }

    const res = await fetch("/api/interviews", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        applicationId,
        scheduledAt: new Date(dateTime).toISOString(),
        interviewType: type,
        meetingLink: type === "ONLINE" ? meetingLink : null,
        notes: notes || null
      }),
    });

    if (!res.ok) {
      toast.error("Failed to schedule interview");
      return;
    }

    setCurrentStatus("INTERVIEW");
    setOpen(false);
    setNotes("");
    setMeetingLink("");
    toast.success("Interview scheduled");

    await fetch("/api/notifications", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: `Interview scheduled for your application`,
        type: "INTERVIEW",
        applicationId,
        status: "INTERVIEW"
      }),
    });

    socket?.emit("send-notification", {
      notification: {
        userId: jobseekerId,
        message: `Interview scheduled for your application at date ${dateTime} and note ${notes}`,
        type: "INTERVIEW",
        created_at: new Date(),
        is_read: false,
        applicationId,
        status: "INTERVIEW"
      }
    });
  };

  const getStatusBadge = () => {
    switch (currentStatus) {
      case "PENDING":
        return <Badge variant="outline" className="gap-1"><Clock className="h-3 w-3" />Pending Review</Badge>;
      case "SCREENING":
        return <Badge variant="default" className="gap-1 bg-blue-500"><CheckCircle2 className="h-3 w-3" />Shortlisted</Badge>;
      case "INTERVIEW":
        return <Badge variant="default" className="gap-1 bg-green-500"><Calendar className="h-3 w-3" />Interview Scheduled</Badge>;
      case "REJECTED":
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" />Rejected</Badge>;
    }
  };

  const getInterviewIcon = () => {
    switch (type) {
      case "ONLINE":
        return <Video className="h-4 w-4" />;
      case "PHONE":
        return <Phone className="h-4 w-4" />;
      case "ONSITE":
        return <Building2 className="h-4 w-4" />;
    }
  };

  return (
    <>
      <div className="group p-4 border-2 rounded-lg hover:border-primary/50 hover:shadow-md transition-all bg-card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-lg">{name}</h3>
              {getStatusBadge()}
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {skills.slice(0, 5).map((skill, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs font-normal">
                  {skill}
                </Badge>
              ))}
              {skills.length > 5 && (
                <Badge variant="secondary" className="text-xs font-normal">
                  +{skills.length - 5} more
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap lg:flex-nowrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/facilitator/candidates/${applicationId}`)}
              className="gap-1.5"
            >
              <Eye className="h-4 w-4" />
              View Profile
            </Button>

            {currentStatus === "PENDING" && (
              <>
                <Button 
                  size="sm" 
                  onClick={() => updateStatus("SCREENING")}
                  className="gap-1.5"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Shortlist
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={() => updateStatus("REJECTED")}
                  className="gap-1.5"
                >
                  <XCircle className="h-4 w-4" />
                  Reject
                </Button>
              </>
            )}

            {currentStatus === "SCREENING" && (
              <Button 
                size="sm" 
                onClick={() => setOpen(true)}
                className="gap-1.5"
              >
                <Calendar className="h-4 w-4" />
                Schedule Interview
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Schedule Interview Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule Interview
            </DialogTitle>
            <DialogDescription>
              Set up an interview with {name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="datetime" className="text-sm font-medium">
                Date & Time
              </Label>
              <Input
                id="datetime"
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-medium">
                Interview Type
              </Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type" className="w-full">
                  <SelectValue placeholder="Select interview type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ONLINE" className="gap-2">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Online Meeting
                    </div>
                  </SelectItem>
                  <SelectItem value="ONSITE">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      On-site
                    </div>
                  </SelectItem>
                  <SelectItem value="PHONE">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Call
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {type === "ONLINE" && (
              <div className="space-y-2">
                <Label htmlFor="meeting-link" className="text-sm font-medium">
                  Meeting Link <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="meeting-link"
                  placeholder="https://zoom.us/j/... or meet.google.com/..."
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium">
                Additional Notes (Optional)
              </Label>
              <Input
                id="notes"
                placeholder="e.g., Bring portfolio, prepare for technical questions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <Separator />

            <Button 
              onClick={scheduleInterview} 
              className="w-full gap-2"
              size="lg"
            >
              {getInterviewIcon()}
              Confirm Interview
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Candidate;
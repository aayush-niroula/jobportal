"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useSocket } from "@/app/providers/SocketProvider";

interface CandidateProps {
  name: string;
  skills: string[];
  status: "PENDING" | "SCREENING" | "REJECTED" | "INTERVIEW";
  applicationId: string;
  jobseekerId:string
}

const Candidate = ({ name, skills, status, applicationId,jobseekerId }: CandidateProps) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [open, setOpen] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const user  =useAuthStore(state=>state.user)
  const [notes, setNotes] = useState("");
const [meetingLink, setMeetingLink] = useState("");

  const [type, setType] = useState("ONLINE");

  const router = useRouter();
  const socket = useSocket()

  const updateStatus = async (newStatus: typeof status) => {
    const res = await fetch("/api/jobseeker/myapplications/status", {
      method: "PATCH",
      headers: {
        Authorization:`Bearer ${user?.token}`,
        "Content-Type": "application/json" },
      body: JSON.stringify({ applicationId, status: newStatus }),
    });

    if (!res.ok) {
      toast.error("Failed to update status");
      return;
    }

    setCurrentStatus(newStatus);
    toast.success(`Status updated to ${newStatus}`);

    socket?.emit("send-notification",{
      userId:jobseekerId,
      notification:{
        message:`Your application status changed to ${newStatus}`,
        type:"STATUS",
        created_at:new Date(),
        applicationId
      }
    })
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
        Authorization:`Bearer ${user?.token}`,
        "Content-Type": "application/json" },
      body: JSON.stringify({
        applicationId,
        scheduledAt: new Date(dateTime).toISOString(),
        interviewType: type,
        meetingLink:type ==="ONLINE" ? meetingLink :null,
        notes:notes || null
      }),
    });

    if (!res.ok) {
      toast.error("Failed to schedule interview");
      return;
    }
    console.log(res);
    

    setCurrentStatus("INTERVIEW");
    setOpen(false);
    setNotes("")
    setMeetingLink("")
    toast.success("Interview scheduled");

     await fetch("/api/notifications", {
    method: "POST",
    headers: {
      Authorization:`Bearer ${user?.token}`,
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
      userId:jobseekerId,
      message: `Interview scheduled for your application at date ${dateTime} and note ${notes} `,
      type: "INTERVIEW",
      created_at: new Date(),
      is_read: false,
      applicationId,
      status: "INTERVIEW"
    }
  });
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-4 p-4 border rounded-lg hover:bg-muted/50 transition">
      <div>
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground">
          {skills.join(", ")}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/facilitator/candidates/${applicationId}`)}
        >
          View Profile
        </Button>

        {currentStatus === "PENDING" && (
          <>
            <Button size="sm" onClick={() => updateStatus("SCREENING")}>
              Shortlist
            </Button>
            <Button size="sm" variant="destructive" onClick={() => updateStatus("REJECTED")}>
              Reject
            </Button>
          </>
        )}

        {currentStatus === "SCREENING" && (
          <Button size="sm" onClick={() => setOpen(true)}>
            Schedule Interview
          </Button>
        )}

        {currentStatus === "INTERVIEW" && (
          <Badge>Interview Scheduled</Badge>
        )}

        {currentStatus === "REJECTED" && (
          <Badge variant="destructive">Rejected</Badge>
        )}
      </div>

      {/* Schedule Interview Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
          </DialogHeader>

      <div className="space-y-4">
  <Input
    type="datetime-local"
    value={dateTime}
    onChange={(e) => setDateTime(e.target.value)}
  />

  <Select value={type} onValueChange={setType}>
    <SelectTrigger>
      <SelectValue placeholder="Interview Type" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="ONLINE">Online</SelectItem>
      <SelectItem value="ONSITE">Onsite</SelectItem>
      <SelectItem value="PHONE">Phone</SelectItem>
    </SelectContent>
  </Select>

  {/* Show only if ONLINE */}
  {type === "ONLINE" && (
    <Input
      placeholder="Meeting link (Zoom / Google Meet)"
      value={meetingLink}
      onChange={(e) => setMeetingLink(e.target.value)}
    />
  )}

  <Input
    placeholder="Notes (optional)"
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
  />

  <Button onClick={scheduleInterview} className="w-full">
    Confirm Interview
  </Button>
</div>

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Candidate;

"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/app/store/useAuthStore";
import { Candidate } from "@/app/types/types";
import { toast } from "sonner";

export default function ApplyForm({ jobId }: { jobId: string }) {
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const user = useAuthStore((state) => state.user);
  const [seekerProfile,setSeekerProfile]= useState<Candidate | null>(null)

  console.log(user);

  useEffect(() => {
    const fetchSeekerProfile = async () => {
      if (!user?.seekerId) return;

      const res = await fetch(`/api/jobseeker/${user?.seekerId}`);
      const data = await res.json();
      console.log(data);
      setSeekerProfile(data)
    };
    fetchSeekerProfile();
  }, [user?.seekerId]);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData(e.currentTarget);

  let resume_url = seekerProfile?.resume_url || null;

  const resumeFile = formData.get("resume") as File;
  if (resumeFile && resumeFile.size > 0) {
    const uploadData = new FormData();
    uploadData.append("file", resumeFile);
    uploadData.append("userId", user?.id || "");

    const uploadRes = await fetch("/api/jobseeker/upload/resume", {
      method: "POST",
    body: uploadData,
    });

    const uploadJson = await uploadRes.json();
    resume_url = uploadJson.url;
  }

  const payload = {
    jobId,
    phone: formData.get("phone"),
    experience: formData.get("experience"),
    coverLetter: formData.get("coverLetter"),
    resume_url,
  };

  const res = await fetch("/api/jobseeker/applyjob", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user?.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    setApplied(true);
    alert("Application submitted successfully!");
  } else {
    alert("Failed to submit application.");
  }

  setLoading(false);
};


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">Apply Now</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Apply for this Job</DialogTitle>
        </DialogHeader>
        <p id="apply-job-description" className="sr-only">
          Fill the form below to apply for this job.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                name="name"
                defaultValue={user?.name}
                placeholder=""
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                name="email"
                defaultValue={user?.email}
                type="email"
                placeholder=""
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input name="phone" defaultValue={seekerProfile?.user.phone} placeholder="98XXXXXXXX" />
            </div>
            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select 
              name="experience"
              defaultValue={seekerProfile?.experiecence_level ?? undefined }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ENTRY">Entry</SelectItem>
                  <SelectItem value="MID">Mid</SelectItem>
                  <SelectItem value="SENIOR">Senior</SelectItem>
                  <SelectItem value="LEAD">Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Upload Resume (PDF)</Label>
            <Input name="resume" type="file" accept=".pdf" required />
          </div>

          <div className="space-y-2">
            <Label>Cover Letter</Label>
            <Textarea
              name="coverLetter"
              rows={4}
              placeholder="Why should we hire you?"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

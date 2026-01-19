"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import LoginModal from "@/app/login/_components/LoginModal";

export default function ApplyForm({ jobId }: { jobId: string }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // dialog state
  const user = useAuthStore((state) => state.user);
  const [seekerProfile, setSeekerProfile] = useState<Candidate | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchSeekerProfile = async () => {
      if (!user?.seekerId) return;

      const res = await fetch(`/api/jobseeker/${user.seekerId}`);
      const data = await res.json();
      setSeekerProfile(data);
    };
    fetchSeekerProfile();
  }, [user?.seekerId]);

  // 🔐 Handle Apply click
  const handleApplyClick = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setOpen(true);
  };

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
      alert("Application submitted successfully!");
      setOpen(false);
    } else {
      alert("Failed to submit application.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* Apply Button */}
      <Button
        className="w-full sm:w-auto"
        onClick={handleApplyClick}
      >
        Apply Now
      </Button>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        redirectTo={`/jobseeker/applynow/${jobId}`}
      />

      {/* Apply Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Apply for this Job
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  defaultValue={user?.name}
                  required
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  defaultValue={user?.email}
                  type="email"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Phone</Label>
                <Input
                  name="phone"
                  defaultValue={seekerProfile?.user.phone}
                />
              </div>

              <div>
                <Label>Experience</Label>
                <Select
                  name="experience"
                  defaultValue={seekerProfile?.experiecence_level}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
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

            <div>
              <Label>Upload Resume (PDF)</Label>
              <Input
                name="resume"
                type="file"
                accept=".pdf"
                required
              />
            </div>

            <div>
              <Label>Cover Letter</Label>
              <Textarea
                name="coverLetter"
                rows={4}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

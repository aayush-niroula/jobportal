"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import RecommendedJobs from "./RecommendedJobs";
import { useAuthStore } from "@/app/store/useAuthStore";
import { Loader2, Upload, FileText } from "lucide-react";

interface Resume {
  name: string;
  url: string;
}

const JobResumeUploader = () => {
  const user = useAuthStore((state) => state.user);

  const [resume, setResume] = useState<Resume | null>(null);
  const [recommendations, setRecommendations] = useState<
    { title: string; company: string; location: string; logo?: string ; id:string}[]
  >([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  console.log(recommendations);
  

  const viewResume = async () => {
  if (!user?.token) return;

  const res = await fetch("/api/jobseeker/currentresume/preview", {
    headers: { Authorization: `Bearer ${user.token}` },
  });

console.log(res);

  if (!res.ok) return alert("Unauthorized");

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  window.open(url, "_blank");
};

  useEffect(() => {
    if (!user?.token) return;

    const fetchResume = async () => {
      const res = await fetch("/api/jobseeker/currentresume", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      console.log(data.resume_url);
      

      if (data?.resume_url) {
        setResume({
          name: "Your current resume",
          url: data.resume_url,
        });
      }
    };

    fetchResume();
  }, [user?.token]);


  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/jobseeker/upload/resume", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type":"application/json"
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();

      setResume({
        name: file.name,
        url: data.url,
      });



    } catch (err: any) {
      setError(err.message || "Failed to upload resume");
    } finally {
      setUploading(false);
    }
  };

const generateRecommendations = async () => {
  if (!user?.token || !resume?.url) return;

  setLoading(true);
  setError(null);

  try {
  
    const res = await fetch("/api/jobseeker/generate-recommendations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to generate recommendations");

    const data = await res.json();
    console.log("recommendations", data);

    if (!data?.success || !data?.data) {
      setError("No recommendations found");
      return;
    }

    setRecommendations(
      data.data.map((job: any) => ({
        id:job.id,
        title: job.job_name,
        company: job.facilitator.company_name,
        location: job.location,
        logo: job.facilitator.company_logo,
      }))
    );
  } catch (err: any) {
    setError(err.message || "Failed to generate recommendations");
  } finally {
    setLoading(false);
  }
};


  return (
<div className="max-w-lg mx-auto p-4">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Your Resume & Job Matches</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Resume Uploaded */}
          {resume ? (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue-600" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{resume.name}</p>
                  <p className="text-xs text-gray-500">Uploaded resume</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {/* View Resume */}
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={viewResume}
                >
                  👁 View
                </Button>

                {/* Download Resume */}
                <Button asChild variant="secondary" size="sm">
                  <a href={resume.url} download className="flex items-center gap-2">
                    ⬇️ Download
                  </a>
                </Button>

                {/* Replace Resume */}
                <Button asChild variant="outline" size="sm" disabled={uploading}>
                  <label className="cursor-pointer flex items-center gap-2">
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Uploading…
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Replace Resume
                      </>
                    )}
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </Button>

                {/* Generate Recommendations */}
                <Button
                  variant="default"
                  size="sm"
                  onClick={generateRecommendations}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Generating…
                    </>
                  ) : (
                    "Generate Recommendations"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
              <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
              <p className="font-medium mb-1">No resume uploaded</p>
              <p className="text-sm text-gray-500 mb-4">
                Upload your resume to get job recommendations
              </p>

              <Button asChild disabled={uploading}>
                <label className="cursor-pointer flex items-center gap-2">
                  {uploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Uploading…
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Upload Resume
                    </>
                  )}
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </Button>
            </div>
          )}

          {/* Recommended Jobs */}
          <RecommendedJobs
            jobs={recommendations}
            onSeeDetails={(job) => console.log(job)}
          />
        </CardContent>
      </Card>
    </div>
  );
};


export default JobResumeUploader;

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import RecommendedJobs from "./RecommendedJobs";

interface Resume {
  name: string;
  url: string;
}

const JobResumeUploader = () => {
  const [resume, setResume] = useState<Resume | null>(null);
  const [recommendations, setRecommendations] = useState<
    { title: string; company: string; location: string; logo?: string }[]
  >([]);

  // Load previously uploaded resume from localStorage
  useEffect(() => {
    const savedResume = localStorage.getItem("uploadedResume");
    if (savedResume) {
      setResume(JSON.parse(savedResume));
      generateRecommendations();
    }
  }, []);

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newResume: Resume = {
        name: file.name,
        url: URL.createObjectURL(file),
      };
      setResume(newResume);
      localStorage.setItem("uploadedResume", JSON.stringify(newResume)); // store in localStorage
      generateRecommendations();
    }
  };

  // Remove resume
  const removeResume = () => {
    setResume(null);
    localStorage.removeItem("uploadedResume"); // remove from localStorage
    setRecommendations([]);
  };

  // Generate demo job recommendations
  const generateRecommendations = () => {
    const demoJobs = [
      {
        title: "Frontend Developer",
        company: "TechCorp",
        location: "New York",
        logo: "https://c8.alamy.com/comp/HTR9NG/employment-career-job-search-recruitment-HTR9NG.jpg",
      },
      {
        title: "Backend Engineer",
        company: "Innovatech",
        location: "San Francisco",
        logo: "https://c8.alamy.com/comp/HTR9NG/employment-career-job-search-recruitment-HTR9NG.jpg",
      },
      {
        title: "Full Stack Developer",
        company: "DevSolutions",
        location: "Remote",
        logo: "https://c8.alamy.com/comp/HTR9NG/employment-career-job-search-recruitment-HTR9NG.jpg",
      },
    ];
    setRecommendations(demoJobs);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Upload Your Resume</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {resume ? (
            <div className="space-y-2">
              <p>
                Uploaded Resume: <strong>{resume.name}</strong>
              </p>
              <a
                href={resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Resume
              </a>
              <Button variant="destructive" size="sm" onClick={removeResume}>
                Remove
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-gray-500 mb-2">No resume uploaded yet.</p>
              <p className="text-sm text-gray-400">Upload your resume to get started</p>
            </div>
          )}

          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="cursor-pointer"
          />

          <RecommendedJobs
            jobs={recommendations}
            onSeeDetails={(job) =>
              alert(
                `Job: ${job.title}\nCompany: ${job.company}\nLocation: ${job.location}`
              )
            }
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default JobResumeUploader;

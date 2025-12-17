"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Users } from "lucide-react";
import { useState } from "react";
import { jobs } from "@/lib/candidateData";
import Candidate from "./Candidate";
const MyJobs = () => {
  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const [candidates, setCandidates] = useState(selectedJob.candidates);
   
  const tabs = [
    { value: "all", label: "All" },
    { value: "shortlisted", label: "Shortlisted" },
    { value: "pending", label: "Pending" },
    { value: "rejected", label: "Rejected" },
  ];

  const updateStatus = (
    id: number,
    status: "shortlisted" | "rejected" | "pending"
  ) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id == id ? { ...c, status } : c))
    );
  };

  return (
    <div className="font-playfair max-w-7xl mx-auto">
      {/* Posted jobs section */}
      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Briefcase />
              Posted Jobs
            </CardTitle>
            <CardDescription>Here is all the posted jobs</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className={`p-3 rounded-xl cursor-pointer transition hover:bg-muted`}
                onClick={() => {
                  setSelectedJob(job);
                  setCandidates(job.candidates);
                }}
              >
                <h1 className="font-medium text-md">{job.title}</h1>
                <p className="text-sm text-gray-500 ">{job.location}</p>
                <Badge className="mt-2" variant={"secondary"}>
                  {job.applications} Applications
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Applications section  */}
        <Card >
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <Users />
              Applications -{selectedJob.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="lg:flex-row lg:mt-0 flex flex-col gap-2 mt-5 w-full justify-center lg:w-auto lg:justify-start">

                {tabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value} className="mt-10 lg:mt-0">
                  <div>
                    {candidates
                      .filter(
                        (c) => tab.value === "all" || c.status == tab.value
                      )
                      .map((candidate) => (
                          <Candidate
                          key={candidate.id}
                            name={candidate.name}
                            skills={candidate.skill}
                            status={candidate.status as "pending" | "shortlisted" | "rejected"}
                            onShortlist={() =>
                              updateStatus(candidate.id, "shortlisted")
                            }
                            onReject={() =>
                              updateStatus(candidate.id, "rejected")
                            }
                          />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyJobs;

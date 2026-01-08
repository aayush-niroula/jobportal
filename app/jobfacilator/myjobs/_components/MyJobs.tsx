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
import { useEffect, useState } from "react";
import { jobs } from "@/lib/candidateData";
import Candidate from "./Candidate";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useSocket } from "@/app/providers/SocketProvider";
import { toast } from "sonner";
const MyJobs = () => {
const [jobs, setJobs] = useState<any[]>([]);
const [selectedJob, setSelectedJob] = useState<any | null>(null);
const [candidates, setCandidates] = useState<any[]>([]);
  const user = useAuthStore(state =>state.user)
    const socket = useSocket();

  const {id}= useParams()
  console.log("Frontend",id);

  console.log("selectejob",selectedJob);



useEffect(() => {
  if (!socket) return;

  const handleNotification = (notification: any) => {
    toast(notification.message); 

  
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === notification.applicationId
          ? { ...c, status: notification.status }
          : c
      )
    );
  };

  socket.on("new-notification", handleNotification);

  return () => {
    socket.off("new-notification", handleNotification);
  };
}, [socket]);

  
  
useEffect(() => {
  const facilitatorOwnJobs = async () => {
    const res = await fetch(`/api/jobs/getUserJob/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    const data = await res.json();

    setJobs(data.jobs || []);

    if (data.jobs?.length > 0) {
      setSelectedJob(data.jobs[0]);
      setCandidates(data.jobs[0].applications || []);
    }
  };

  facilitatorOwnJobs();
}, [id, user?.token]);

  
   
  const tabs = [
    { value: "all", label: "All" },
    { value: "SCREENING", label: "Screening" },
    { value: "PENDING", label: "Pending" },
    { value: "REJECTED", label: "Rejected" },
  ];

const updateStatus = async (
  applicationId: number,
  status: "SCREENING" | "REJECTED" | "PENDING"
) => {
  await fetch("/api/jobseeker/myapplications/status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token}`,
    },
    body: JSON.stringify({ applicationId, status }),
  });

  setCandidates((prev) =>
    prev.map((c) => (c.id === applicationId ? { ...c, status } : c))
  );
};


  return (
    <div className="font-playfair max-w-7xl mx-auto">
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
            {jobs.map((j) => (
              <div
                key={j.id}
                className={`p-3 rounded-xl cursor-pointer transition hover:bg-muted`}
                onClick={() => {
                  setSelectedJob(j);
                  setCandidates(j.applications || []);
                }}
              >
                <h1 className="font-medium text-md">{j.job_name}</h1>
                <p className="text-sm text-gray-500 ">{j.location}</p>
                <Badge className="mt-2" variant={"secondary"}>
                  {j.applications.length} Applications
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
              Applications -{selectedJob?.job_name}
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
                            name={candidate?.seeker?.user?.name}
                            skills={candidate?.seeker?.technical_skills}
                            status={candidate?.status}
                            applicationId={candidate.id}
                            jobseekerId={candidate?.seeker?.id}
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

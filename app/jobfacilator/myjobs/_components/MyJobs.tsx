"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Users, MapPin, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import Candidate from "./Candidate";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useSocket } from "@/app/providers/SocketProvider";
import { toast } from "sonner";

const MyJobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [candidates, setCandidates] = useState<any[]>([]);
  const user = useAuthStore(state => state.user);
  const socket = useSocket();
  const { id } = useParams();

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
    { value: "all", label: "All Candidates", count: candidates.length },
    { value: "SCREENING", label: "Shortlisted", count: candidates.filter(c => c.status === "SCREENING").length },
    { value: "PENDING", label: "Pending Review", count: candidates.filter(c => c.status === "PENDING").length },
    { value: "REJECTED", label: "Rejected", count: candidates.filter(c => c.status === "REJECTED").length },
  ];

  const getStatusColor = (count: number) => {
    if (count === 0) return "text-muted-foreground";
    return "text-primary";
  };

  return (
    <div className="font-playfair max-w-7xl mx-auto p-4 lg:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">My Job Postings</h1>
        <p className="text-muted-foreground">Manage your job listings and review candidates</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Jobs List Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="h-5 w-5" />
              Active Jobs
            </CardTitle>
            <CardDescription>
              {jobs.length} {jobs.length === 1 ? 'position' : 'positions'} posted
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {jobs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No jobs posted yet</p>
              </div>
            ) : (
              jobs.map((j) => (
                <div
                  key={j.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
                    selectedJob?.id === j.id
                      ? "border-primary bg-primary/5"
                      : "border-transparent hover:border-muted-foreground/20 hover:bg-muted/50"
                  }`}
                  onClick={() => {
                    setSelectedJob(j);
                    setCandidates(j.applications || []);
                  }}
                >
                  <h3 className="font-semibold text-base mb-1">{j.job_name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3" />
                    <span>{j.location}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {j.applications.length} {j.applications.length === 1 ? 'Application' : 'Applications'}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Applications Section */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex gap-2 items-center text-lg">
              <Users className="h-5 w-5" />
              Candidates
            </CardTitle>
            {selectedJob && (
              <CardDescription className="text-base">
                {selectedJob.job_name}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {!selectedJob ? (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-1">No job selected</p>
                <p className="text-sm">Select a job from the list to view candidates</p>
              </div>
            ) : (
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 h-auto p-1 bg-muted/50">
                  {tabs.map((tab) => (
                    <TabsTrigger 
                      key={tab.value} 
                      value={tab.value}
                      className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-background"
                    >
                      <span className="text-sm font-medium">{tab.label}</span>
                      <span className={`text-xs ${getStatusColor(tab.count)}`}>
                        {tab.count}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {tabs.map((tab) => (
                  <TabsContent key={tab.value} value={tab.value} className="mt-6">
                    <div className="space-y-3">
                      {candidates.filter(
                        (c) => tab.value === "all" || c.status === tab.value
                      ).length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                          <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p className="text-sm">No candidates in this category</p>
                        </div>
                      ) : (
                        candidates
                          .filter((c) => tab.value === "all" || c.status === tab.value)
                          .map((candidate) => (
                            <Candidate
                              key={candidate.id}
                              name={candidate?.seeker?.user?.name}
                              skills={candidate?.seeker?.technical_skills}
                              status={candidate?.status}
                              applicationId={candidate.id}
                              jobseekerId={candidate?.seeker?.id}
                            />
                          ))
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyJobs;
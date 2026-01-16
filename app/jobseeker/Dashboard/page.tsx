"use client";
import Information from "../components/Information";
import ApplyCard from "../components/ApplyCard";
import ProfileCompleteness from "../components/ProfileCompleteness";
import Notifications from "../components/Notifications";
import { Button } from "@/components/ui/button";
import RecentApplication from "../components/RecentApplication";
import Footer from "@/app/_components/Footer";
import { useRouter } from "next/navigation";
import BookmarkedJobs from "../components/BookmarkedJobs";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useCallback, useEffect, useState } from "react";
import { Application, Candidate, Job } from "@/app/types/types";

const page = () => {
  const router = useRouter();
  const user = useAuthStore(state =>state.user)
  const [profileData,setProfileData]= useState<Candidate | null>(null)
  const [featuredJobs,setFeaturedJobs]= useState<Job[]>([])
  const [recentApplications,setRecentApplications] = useState<Application[]>([])
  const [bookmarkedJobs,setBookmarkedJobs] = useState<Job[]>([])

    const fetchBookmarkedJobs = async () => {
      if (!user?.token) return;
  
      try {
  
        const res = await fetch("/api/bookmark", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });
        const data:Job[] = await res.json();
        
    
        setBookmarkedJobs(data);
      } catch (err) {
        console.error("Failed to fetch bookmarked jobs:", err);
      }
    };
    useEffect(() => {
    fetchBookmarkedJobs();
  }, [user?.token]);

const fetchJobs = useCallback(async()=>{
 const res = await fetch('/api/jobseeker/jobs')
 const data = await res.json()
 setFeaturedJobs(data.data.slice(0,3))
 
},[user?.token])
useEffect(()=>{
fetchJobs()
},[fetchJobs])



useEffect(()=>{
  const fetchApplications = async()=>{
    const res = await fetch(`/api/jobseeker/myapplications`,{
      method:"GET",
      headers:{
        Authorization:`Bearer ${user?.token}`,
        "Content-Type":"application/json"
      }
    })

    const data = await res.json()

    console.log("Applications",data);
    setRecentApplications(data.application)
    
  }
  fetchApplications()
},[user?.token])


useEffect(()=>{

  const fetchProfile = async()=>{
    const res = await fetch("/api/jobseeker/profile",{
      method:"GET",
      headers:{
        Authorization:`Bearer ${user?.token}`,
        "Content-Type":"application/json"
      }
    })
    const data = await res.json()
    console.log(data);
    
    setProfileData(data)
    
  }
  fetchProfile()
},[user?.token])

  const applications = profileData?.applications ?? [];
  const totalApplications = applications.length;
  const inReviewCount = applications.filter(
  (app) => app.status === "PENDING"
).length;

const interviewCount = applications.filter(
  (app) => app.status === "INTERVIEW"
).length;
const bookmarkCount = profileData?.bookmarks?.length ?? 0

  return (
    <div className="min-h-screen bg-background font-playfair">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-playfair">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Here’s what’s happening with your job search.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 bg-card rounded-lg border">
          <Information title="Applications" number={totalApplications} lastline="+2 this week" />
          <Information title="In Review" number={inReviewCount} lastline="pending review" />
          <Information title="Interview" number={interviewCount} lastline="interview" />
          <Information title="Saved Jobs" number={bookmarkCount} lastline="bookmarked" />
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8" aria-label="Dashboard actions">
        
          
          <div className="lg:col-span-2 space-y-6">
            <h1 className="font-playfair text-xl lg:text-4xl lg:font-bold">Featured jobs</h1>
            {featuredJobs?.map((job, i) => (
              <ApplyCard key={i} 
                job={{
                  ...job,isBookmarked:bookmarkedJobs?.some(b=>b.id ===job?.id)
                }}
                onToggleBookmark = {()=>{
                  fetchJobs()
                  fetchBookmarkedJobs()
                }}


              />
            ))}

              <BookmarkedJobs
              bookmarkedJobs = {bookmarkedJobs}
              fetchBookmarkedJobs = {fetchBookmarkedJobs}
              />
          </div>
          {/* Right: Sidebar */}
          <div className="space-y-6 lg:col-span-1 lg:mt-15">
            <ProfileCompleteness 
            profile= {profileData}
            />
            <Notifications />
            <div className="p-6 border border-border rounded-2xl shadow-sm w-full lg:min-w-87.5">
              <h2 className="text-xl sm:text-2xl font-bold font-playfair mb-2">AI Resume Analysis</h2>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Upload your resume and get instant job recommendations powered by AI.
              </p>
              <Button 
                className="w-full sm:w-auto p-3" 
                onClick={() => router.push('/jobseeker/uploadresume')}
                aria-label="Start resume analysis"
              >
                Start Analyzing
              </Button>
            </div>
          </div>
        </section>

        {/* Recent Applications */}
        <section className="space-y-4" aria-label="Recent applications">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center pr-0 sm:pr-6">
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-medium font-playfair flex-1">
              Recent Applications
            </h2>
            <Button variant="outline" className="shrink-0">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {recentApplications?.map((application, i) => (
              <RecentApplication key={i} 
              application = {application}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default page;
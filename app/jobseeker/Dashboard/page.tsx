"use client";
import Information from "../components/Information";
import ApplyCard from "../components/ApplyCard";
import ProfileCompleteness from "../components/ProfileCompleteness";
import Notifications from "../components/Notifications";
import { Button } from "@/components/ui/button";
import RecentApplication from "../components/RecentApplication";
import Footer from "@/app/_components/Footer";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  // Placeholder for dynamic user data (replace with real props/state)
  const userName = "Alex"; // Fetch from auth/context

  return (
    <div className="min-h-screen bg-background">
      {/* Main Container for Max Width & Centering */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-playfair">
            Welcome back, {userName}!
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Here’s what’s happening with your job search.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 bg-card rounded-lg border">
          <Information title="Applications" number={20} lastline="+2 this week" />
          <Information title="In Review" number={20} lastline="pending review" />
          <Information title="Saved Jobs" number={8} lastline="bookmarked" />
        </div>

        {/* Main Content: Apply Cards + Sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8" aria-label="Dashboard actions">
          {/* Left: Apply Cards */}
          <div className="lg:col-span-2 space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <ApplyCard key={i} />
            ))}
          </div>
          {/* Right: Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <ProfileCompleteness />
            <Notifications />
            <div className="p-6 border border-border rounded-2xl shadow-sm w-full lg:min-w-[350px]">
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
            {Array.from({ length: 4 }).map((_, i) => (
              <RecentApplication key={i} />
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
"use client"
import { useSocket } from '@/app/providers/SocketProvider';
import { useAuthStore } from '@/app/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { CheckCircle2, XCircle, Clock, User } from 'lucide-react';

type RecentApplication = {
  id: string;
  applicationId: string;
  name: string;
  appliedfor: string;
  appliedtime: number;
  skills: string[];
  seeker_image: string;
  status: "PENDING" | "SCREENING" | "REJECTED" | "INTERVIEW";
}

const RecentApplicationCard = ({
  id,
  name,
  appliedfor,
  appliedtime,
  skills,
  seeker_image,
  applicationId,
  status
}: RecentApplication) => {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const socket = useSocket();
  const [currentStatus, setCurrentStatus] = useState(status);
  const [loading, setLoading] = useState(false);

  const updateStatus = async (status: "SCREENING" | "REJECTED") => {
    try {
      setLoading(true);

      const res = await fetch("/api/jobseeker/myapplications/status", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          applicationId: applicationId,
          status
        })
      });

      if (!res.ok) {
        toast.error("Failed to update status");
        return;
      }
      setCurrentStatus(status);

      toast.success(
        status === "SCREENING"
          ? "Candidate shortlisted"
          : "Candidate rejected"
      );

      socket?.emit("send-notification", {
        userId: id,
        notification: {
          message: `Your application was ${status}`,
          type: "STATUS",
          created_at: new Date(),
          applicationId: id
        }
      });

    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const getStatusBadge = () => {
    switch (currentStatus) {
      case "SCREENING":
        return <Badge className="gap-1 bg-black text-white border-2 border-black"><CheckCircle2 className="h-3 w-3" />Shortlisted</Badge>;
      case "REJECTED":
        return <Badge variant="outline" className="gap-1 border-2 border-black"><XCircle className="h-3 w-3" />Rejected</Badge>;
      case "PENDING":
        return <Badge variant="outline" className="gap-1 border-2 border-black"><Clock className="h-3 w-3" />Pending</Badge>;
      default:
        return null;
    }
  }

  return (
<div className={clsx(
  "w-full bg-white border-2 rounded-lg p-4 sm:p-6 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between transition-all duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5",
  {
    "border-black": ["SCREENING", "REJECTED", "PENDING"].includes(currentStatus),
  }
)}>

      <div className='flex gap-4 flex-1'>
        <div className='flex flex-col justify-between items-center gap-2'>
          <div className='w-16 h-16 rounded-full border-2 border-black overflow-hidden bg-gray-100'>
            {seeker_image ? (
              <img src={seeker_image} alt="profile" className='object-cover w-full h-full' />
            ) : (
              <div className='w-full h-full flex items-center justify-center'>
                <User className='h-8 w-8 text-gray-400' />
              </div>
            )}
          </div>
          <p className='text-xs text-gray-600'>
            {appliedtime}h ago
          </p>
        </div>

        <div className='flex flex-col gap-2 flex-1'>
          <div className='flex items-start justify-between gap-2 flex-wrap'>
            <div>
              <h3 className='font-bold text-lg text-black'>{name}</h3>
              <p className='text-sm text-gray-600'>{appliedfor}</p>
            </div>
            {getStatusBadge()}
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {skills?.slice(0, 4).map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs border-2 border-black rounded-md bg-white hover:bg-gray-50 transition-colors"
              >
                {skill}
              </span>
            ))}
            {skills?.length > 4 && (
              <span className="px-3 py-1 text-xs border-2 border-black rounded-md bg-white">
                +{skills.length - 4} more
              </span>
            )}
          </div>

          <Button
            onClick={() => router.push(`/jobfacilator/candidates/candidateprofile/${id}`)}
            variant="outline"
            className='w-fit mt-3 border-2 border-black hover:bg-black hover:text-white'
            size="sm"
          >
            View Profile
          </Button>
        </div>
      </div>

<div className='flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto lg:w-40'>
  <Button
    onClick={() => updateStatus("SCREENING")}
    disabled={loading || currentStatus === "SCREENING"}
    className={clsx(
      'border-2 border-black transition-all',
      "w-full sm:w-auto",
      currentStatus === "SCREENING"
        ? "bg-black text-white"
        : "bg-white text-black hover:bg-black hover:text-white"
    )}
  >
    <CheckCircle2 className="h-4 w-4 mr-2" />
    {currentStatus === "SCREENING" ? "Shortlisted" : "Shortlist"}
  </Button>

  <Button
    onClick={() => updateStatus("REJECTED")}
    disabled={loading || currentStatus === "REJECTED"}
    className={clsx(
      'border-2 border-black transition-all',
      "w-full sm:w-auto",
      currentStatus === "REJECTED"
        ? "bg-black text-white"
        : "bg-white text-black hover:bg-black hover:text-white"
    )}
  >
    <XCircle className="h-4 w-4 mr-2" />
    {currentStatus === "REJECTED" ? "Rejected" : "Reject"}
  </Button>
</div>

    </div>
  )
}

export default RecentApplicationCard
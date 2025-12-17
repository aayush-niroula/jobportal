"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


interface CandidateProps {
  name: string;
  skills: string;
  status?: "pending" | "shortlisted" | "rejected";
  onShortlist: () => void;
  onReject: () => void;
}

const Candidate = ({
  name,
  skills,
  status = "pending", 
  onShortlist,
  onReject,
}: CandidateProps) => {
  const isPending = status === "pending";
  const isShortlisted = status === "shortlisted";
  const isRejected = status === "rejected";
  const router = useRouter()
  return (
    <div className="lg:flex-row md:flex-row md:justify-between flex flex-col gap-4 lg:justify-between lg:items-center p-4 border rounded-lg hover:bg-muted/50 transition">
      <div className="flex flex-col">
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground">{skills}</p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={()=>router.push('/jobseeker/applynow')}>
          View Profile
        </Button>

        {isPending && (
          <>
            <Button variant="default" size="sm" onClick={onShortlist}>
              Shortlist
            </Button>
            <Button variant="destructive" size="sm" onClick={onReject}>
              Reject
            </Button>
          </>
        )}

        {isShortlisted && (
          <Badge variant="default" className="px-3 py-1">
            Shortlisted
          </Badge>
        )}

        {isRejected && (
          <Badge variant="destructive" className="px-3 py-1">
            Rejected
          </Badge>
        )}
      </div>
    </div>
  );
};

export default Candidate;
"use client";

import { Button } from "@/components/ui/button";
import BookmarkedJobsCard from "./BookmarkedJobsCard";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useEffect, useState } from "react";
import { Job } from "@/app/types/types";

interface BookmarkedJobsProps {
  bookmarkedJobs: Job[];
  fetchBookmarkedJobs: () => void;
}

const BookmarkedJobs = ({bookmarkedJobs,fetchBookmarkedJobs}:BookmarkedJobsProps) => {

  
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-playfair text-xl lg:text-3xl font-medium">
          Bookmarked Jobs
        </h2>

        <Button variant="outline" size="sm">
          View all
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {bookmarkedJobs.length > 0 ? (
          bookmarkedJobs.map(job => (
            <BookmarkedJobsCard key={job.id} job={job} />
          ))
        ) : (
          <p className="text-muted-foreground">No bookmarked jobs yet.</p>
        )}
      </div>
    </section>
  );
};

export default BookmarkedJobs;

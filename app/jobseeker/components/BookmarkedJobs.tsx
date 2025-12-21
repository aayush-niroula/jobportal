"use client";

import { Button } from "@/components/ui/button";
import BookmarkedJobsCard from "./BookmarkedJobsCard";

const BookmarkedJobs = () => {
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
        {Array.from({ length: 2 }).map((_, i) => (
          <BookmarkedJobsCard key={i} />
        ))}
      </div>
    </section>
  );
};

export default BookmarkedJobs;

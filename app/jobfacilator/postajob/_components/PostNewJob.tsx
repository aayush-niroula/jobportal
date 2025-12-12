"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function PostNewJob() {
  return (
    <div className="w-full flex justify-center bg-[#F1F5F9] py-10 px-4 sm:px-6">
      <Card className="w-full max-w-[600px] p-4 sm:p-6 rounded-2xl shadow-lg">

        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-playfair">
            Post a New Job
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5 sm:space-y-6">

          <div className="space-y-1.5">
            <Label>Job Title</Label>
            <Input placeholder="e.g. Frontend Developer" />
          </div>

          <div className="space-y-1.5">
            <Label>Company Name</Label>
            <Input placeholder="Your company name" />
          </div>

          <div className="space-y-1.5">
            <Label>Job Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fulltime">Full-time</SelectItem>
                <SelectItem value="parttime">Part-time</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="intern">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Location</Label>
            <Input placeholder="e.g. Kathmandu, Nepal / Remote" />
          </div>

          <div className="space-y-1.5">
            <Label>Salary Range</Label>
            <Input placeholder="e.g. NPR 50,000 - 120,000" />
          </div>

          <div className="space-y-1.5">
            <Label>Job Description</Label>
            <Textarea
              rows={5}
              placeholder="Describe the role, responsibilities, and qualifications..."
            />
          </div>

          <div className="space-y-1.5">
            <Label>Required Skills</Label>
            <Input placeholder="e.g. React, Node.js, UI/UX" />
          </div>

          <Button className="w-full bg-black text-white hover:bg-gray-800 py-3 rounded-xl">
            Publish Job
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}

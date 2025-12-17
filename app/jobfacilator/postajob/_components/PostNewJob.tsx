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
    <div className="w-full flex justify-center bg-[#F1F5F9] py-10 px-4 sm:px-6 font-playfair">
      <Card className="w-full max-w-[600px] p-4 sm:p-6 rounded-2xl shadow-lg">

        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl md:text-4xl font-playfair">
            Post a New Job
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5 sm:space-y-6">

          <div className="space-y-1.5">
            <Label className="text-md md:text-xl">Job Title</Label>
            <Input placeholder="" className="m:p-6" />
          </div>

          <div className="space-y-1.5">
            <Label className="text-md md:text-xl">Company Name</Label>
            <Input placeholder="Your company name" className="m:p-6"/>
          </div>

          <div className="space-y-1.5">
            <Label className="text-md md:text-xl">Job Type</Label>
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
            <Label className="text-md md:text-xl">Location</Label>
            <Input placeholder="" className="m:p-6" />
          </div>

          <div className="space-y-1.5">
            <Label className="text-md md:text-xl">Salary Range</Label>
            <Input placeholder="e.g. NPR 50,000 - 120,000" className="m:p-6" />
          </div>

          <div className="space-y-1.5">
            <Label className="text-md md:text-xl">Job Description</Label>
            <Textarea
              rows={5}
              placeholder="Describe the role, responsibilities, and qualifications..."
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-md md:text-xl">Required Skills</Label>
            <Input placeholder="React, Node.js, UI/UX" className="m:p-6" />
          </div>

          <Button className="w-full bg-black text-white hover:bg-gray-800 py-3 rounded-xl">
            Publish Job
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}

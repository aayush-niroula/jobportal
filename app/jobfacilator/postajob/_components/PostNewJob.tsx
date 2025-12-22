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
      <Card className="w-full max-w-[720px] p-4 sm:p-6 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl md:text-4xl">
            Post a New Job
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          <div className="space-y-1.5">
            <Label>Job Title</Label>
            <Input placeholder="MERN Stack Developer" />
          </div>

<div className="lg:flex-row lg:flex-start flex flex-col items-center gap-4">
          <div className="space-y-1.5">
            <Label>Job Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FULL_TIME">Full-time</SelectItem>
                <SelectItem value="PART_TIME">Part-time</SelectItem>
                <SelectItem value="CONTRACT">Contract</SelectItem>
                <SelectItem value="INTERN">Internship</SelectItem>
                <SelectItem value="FREELANCE">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>

   
          <div className="space-y-1.5">
            <Label>Work Mode</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select work mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ONSITE">Onsite</SelectItem>
                <SelectItem value="REMOTE">Remote</SelectItem>
                <SelectItem value="HYBRID">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

     
          <div className="space-y-1.5">
            <Label>Experience Level</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ENTRY">Entry</SelectItem>
                <SelectItem value="MID">Mid</SelectItem>
                <SelectItem value="SENIOR">Senior</SelectItem>
                <SelectItem value="LEAD">Lead</SelectItem>
              </SelectContent>
            </Select>
          </div>
</div>

          <div className="space-y-1.5">
            <Label>Location</Label>
            <Input placeholder="Kathmandu, Nepal" />
          </div>

          {/* Salary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Min Salary</Label>
              <Input placeholder="50000" type="number" />
            </div>
            <div className="space-y-1.5">
              <Label>Max Salary</Label>
              <Input placeholder="120000" type="number" />
            </div>
            <div className="space-y-1.5">
              <Label>Currency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NPR">NPR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Application Deadline</Label>
            <Input type="date" />
          </div>

    
          <div className="space-y-1.5">
            <Label>Job Description</Label>
            <Textarea
              rows={5}
              placeholder="Describe the role and overall expectations..."
            />
          </div>

          <div className="space-y-1.5">
            <Label>Key Responsibilities</Label>
            <Textarea
              rows={4}
              placeholder="Design systems, collaborate with teams, review code..."
            />
          </div>

          {/* Requirements */}
          <div className="space-y-1.5">
            <Label>Required Qualifications</Label>
            <Textarea
              rows={4}
              placeholder="Bachelor's degree, 3+ years experience..."
            />
          </div>

          {/* Preferred Qualifications */}
          <div className="space-y-1.5">
            <Label>Preferred Qualifications</Label>
            <Textarea
              rows={3}
              placeholder="Master's degree, leadership experience..."
            />
          </div>

          {/* Skills */}
          <div className="space-y-1.5">
            <Label>Skills (comma separated)</Label>
            <Input placeholder="React, Node.js, MongoDB" />
          </div>

          {/* Benefits */}
          <div className="space-y-1.5">
            <Label>Benefits (comma separated)</Label>
            <Input placeholder="Health Insurance, Bonus, Remote Work" />
          </div>

          {/* Submit */}
          <Button className="w-full py-3 rounded-xl bg-black text-white hover:bg-gray-800">
            Publish Job
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

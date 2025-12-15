"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EditCompanyProfile = () => {
  return (
    <Card className="w-full max-w-3xl mx-auto rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Edit Company Profile
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex flex-col gap-3">
          <Label>Company Logo</Label>
          <div className="flex items-center gap-4">
            <img
              src="/Logo.jpg"
              alt="Company Logo"
              className="w-24 h-24 rounded-xl border object-contain bg-gray-50 p-2"
            />
            <Input type="file" />
          </div>
        </div>

     
        <div className="space-y-2">
          <Label>Company Name</Label>
          <Input placeholder="Enter company name" />
        </div>

        <div className="space-y-2">
          <Label>Industry</Label>
          <Input placeholder="e.g. Software, Finance, Healthcare" />
        </div>

    
        <div className="space-y-2">
          <Label>Location</Label>
          <Input placeholder="City, Country" />
        </div>

  
        <div className="space-y-2">
          <Label>Website</Label>
          <Input placeholder="https://company.com" />
        </div>

  
        <div className="space-y-2">
          <Label>Company Description</Label>
          <Textarea
            placeholder="Tell us about your company..."
            className="min-h-[120px]"
          />
        </div>

   
        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditCompanyProfile;

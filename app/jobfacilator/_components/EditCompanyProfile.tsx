"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const EditCompanyProfile = () => {
  const [galleryImages, setGalleryImages] = useState<File[]>([]);

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setGalleryImages((prev) => [...prev, ...newFiles]);
    e.target.value = "";
  };

  return (
    <Card className="w-full max-w-4xl mx-auto rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Edit Company Profile
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input placeholder="Enter company name" />
          </div>

          <div className="space-y-2">
            <Label>Company Email</Label>
            <Input type="email" placeholder="company@email.com" />
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>
            <Input placeholder="+977 98XXXXXXXX" />
          </div>

          <div className="space-y-2">
            <Label>Industry</Label>
            <Input placeholder="Software, Finance, Healthcare" />
          </div>

          <div className="space-y-2">
            <Label>Department</Label>
            <Input placeholder="Engineering, Marketing" />
          </div>

          <div className="space-y-2">
            <Label>Company Size</Label>
            <Input placeholder="e.g. 10-50, 1000-5000" />
          </div>

          <div className="space-y-2">
            <Label>Founded Year</Label>
            <Input type="number" placeholder="2003" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Location</Label>
            <Input placeholder="City, Country" />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Google Map Link</Label>
            <Input placeholder="https://maps.google.com/..." />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Website</Label>
          <Input placeholder="https://company.com" />
        </div>
        <div className="space-y-2">
          <Label>Company Description</Label>
          <Textarea
            placeholder="Tell us about your company..."
            className="min-h-35"
          />
        </div>
        <div className="space-y-2">
          <Label>Company Features</Label>
          <Input placeholder="Remote Friendly, Health Benefits, Flexible Hours" />
          <p className="text-sm text-gray-500">features</p>
        </div>

        <div className="space-y-2">
          <Label>Company Gallery</Label>
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleGalleryUpload}
          />
          <p className="text-sm text-gray-500">Upload multiple images</p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-6">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditCompanyProfile;

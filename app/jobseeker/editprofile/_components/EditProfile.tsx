"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";

export default function EditProfile() {
 const [photoPreview, setPhotoPreview] = useState<string | null>("/goat.jpg");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Resume State
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  // Handle Profile Photo Upload
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("Image size should be less than 5MB");
        return;
      }

      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = () => photoInputRef.current?.click();

  const removePhoto = () => {
    setPhotoPreview("/goat.jpg");
    setPhotoFile(null);
    if (photoInputRef.current) photoInputRef.current.value = "";
  };

  // Handle Resume Upload
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        alert("Please upload a PDF file only");
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert("Resume size should be less than 10MB");
        return;
      }
      setResumeFile(file);
    }
  };

  const handleResumeClick = () => resumeInputRef.current?.click();

  const removeResume = () => {
    setResumeFile(null);
    if (resumeInputRef.current) resumeInputRef.current.value = "";
  };
  return (
    <div className="min-h-screen bg-muted/40 flex justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold">Edit Profile</h1>
          <Button>Save Changes</Button>
        </div>
<Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-6">
            <Avatar className="h-32 w-32">
              <AvatarImage src={photoPreview || undefined} />
              <AvatarFallback>Photo</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handlePhotoClick}
              >
                <Upload className="h-4 w-4" />
                {photoFile ? "Change Photo" : "Upload New Photo"}
              </Button>

              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />

              {photoPreview && photoPreview !== "/goat.jpg" && (
                <Button variant="ghost" size="sm" onClick={removePhoto}>
                  <X className="h-4 w-4 mr-1" /> Remove Photo
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input placeholder="" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="+977-98XXXXXXXX" />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input placeholder="Kathmandu, Nepal" />
            </div>
          </CardContent>
        </Card>


        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input placeholder="Frontend Developer" />
            </div>
            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="junior">Junior</SelectItem>
                  <SelectItem value="mid">Mid-Level</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Skills</Label>
              <Input placeholder="React, Next.js, Tailwind, Prisma" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>About Me</Label>
              <Textarea placeholder="Short professional summary..." rows={4} />
            </div>
          </CardContent>
        </Card>

   
<Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Resume & Links</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Resume (PDF)</p>
                  <p className="text-sm text-muted-foreground">
                    Upload your latest resume (PDF only, max 10MB)
                  </p>
                </div>
              </div>

              {!resumeFile ? (
                <Button variant="outline" onClick={handleResumeClick}>
                  <Upload className="h-4 w-4 mr-2" /> Upload Resume
                </Button>
              ) : (
                <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded">
                      <Upload className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{resumeFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={removeResume}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <input
                ref={resumeInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleResumeChange}
                className="hidden"
              />
            </div>

       
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>LinkedIn</Label>
                <Input placeholder="https://linkedin.com/in/username" />
              </div>
              <div className="space-y-2">
                <Label>GitHub / Portfolio</Label>
                <Input placeholder="https://github.com/username" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

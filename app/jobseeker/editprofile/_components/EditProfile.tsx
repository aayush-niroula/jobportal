"use client";

import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";


type WorkExperience = {
  role: string;
  company: string;
  start_date: string;
  end_date?: string;
  points: string[];
};

type Education = {
  degree: string;
  institution: string;
  start_year: number;
  end_year?: number;
};

export default function EditProfile() {
   const user = useAuthStore((state) => state.user);
   console.log(user);
   
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [experienceLevel, setExperienceLevel] = useState<"ENTRY"|"MID"|"SENIOR"|"LEAD"|"">("");
  const [technicalSkills, setTechnicalSkills] = useState("");
  const [softSkills, setSoftSkills] = useState("");
  const [summary, setSummary] = useState("");

  const [availability, setAvailability] = useState("");
  const [expectedSalaryMin, setExpectedSalaryMin] = useState<number | "">("");
  const [expectedSalaryMax, setExpectedSalaryMax] = useState<number | "">("");
  const [jobType, setJobType] = useState("");
  const [workMode, setWorkMode] = useState("");
const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null)
  const [profileImage, setProfileImage] = useState<string | null>(null);


  const addWorkExperience = () => {
    setWorkExperiences([...workExperiences, { role: "", company: "", start_date: "", end_date: "", points: [] }]);
  };

  const updateWorkExperience = (index: number, field: keyof WorkExperience, value: any) => {
    const copy = [...workExperiences];
    (copy[index][field] as any) = value;
    setWorkExperiences(copy);
  };

  const removeWorkExperience = (index: number) => {
    const copy = [...workExperiences];
    copy.splice(index, 1);
    setWorkExperiences(copy);
  };

  const addEducation = () => {
    setEducations([...educations, { degree: "", institution: "", start_year: new Date().getFullYear(), end_year: undefined }]);
  };

  const updateEducation = (index: number, field: keyof Education, value: any) => {
    const copy = [...educations];
    (copy[index][field] as any) = value;
    setEducations(copy);
  };

  const removeEducation = (index: number) => {
    const copy = [...educations];
    copy.splice(index, 1);
    setEducations(copy);
  };

  const uploadPhoto = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("userId", user?.id || "");
    await fetch("/api/jobseeker/upload/photo", { method: "POST", body: fd });
  };

  const uploadResume = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("userId", user?.id || "");
    await fetch("/api/jobseeker/upload/resume", { method: "POST",headers:{
     Authorization:`Bearer ${user?.token}`
    }, body: fd });
  };

useEffect(() => {
  if (!user?.token) return;

  const fetchData = async () => {
    const res = await fetch("/api/jobseeker/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await res.json();

    console.log(data);


    setName(data.user?.name ?? "");
    setEmail(data.user?.email ?? "");
    setPhone(data.user?.phone ?? ""); 
    setLocation(data.user?.location ?? "");

  
    setProfileImage(data.profile_image);
    setExperienceLevel(data.experience_level ?? "");
    setSummary(data.professional_summary ?? "");
    setTechnicalSkills(data.technical_skills?.join(", ") ?? "");
    setSoftSkills(data.soft_skills?.join(", ") ?? "");
    setAvailability(data.availability ?? "");
    setExpectedSalaryMin(data.expected_salary_min ?? "");
    setExpectedSalaryMax(data.expected_salary_max ?? "");
    setJobType(data.job_type ?? "");
    setWorkMode(data.work_mode ?? "");
    setLinkedin(data.linkedin_url ?? "");
    setPortfolio(data.portfolio_url ?? "");
    setEducations(data.educations ?? []);
    setWorkExperiences(data.experiences ?? []);
    setResumeUrl(data.resume_url ?? null);

  };

  fetchData();
}, [user?.token]);

const getFileName = (url: string) => {
  try {
    return decodeURIComponent(url.split("/").pop() || "resume.pdf");
  } catch {
    return "resume.pdf";
  }
};



  const handleSave = async () => {
    try {
      setLoading(true);

      if (!user?.token) {
        alert("User not authenticated");
        return;
      }

      await fetch("/api/jobseeker/profile", {
        method: "PUT",
        headers: {
          Authorization:`Bearer ${user.token}`,
           "Content-Type": "application/json" 
          },
        body: JSON.stringify({
          userId: user?.id,
          name,
          email,
          phone,
          location,
          experience_level: experienceLevel || null,
          technical_skills: technicalSkills.split(",").map(s => s.trim()),
          soft_skills: softSkills.split(",").map(s => s.trim()),
          professional_summary: summary,
          availability,
          expected_salary_min: expectedSalaryMin || null,
          expected_salary_max: expectedSalaryMax || null,
          job_type: jobType || null,
          work_mode: workMode || null,
          linkedin_url: linkedin,
          portfolio_url: portfolio,
          work_experiences: workExperiences,
          educations
        }),
      });

      if (photoPreview && photoInputRef.current?.files?.[0]) {
        await uploadPhoto(photoInputRef.current.files[0]);
      }

      if (resumeFile) {
        await uploadResume(resumeFile);
      }

      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/40 p-6 font-playfair">
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Edit Profile</h1>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <Card className="rounded-2xl">
          <CardHeader><CardTitle>Profile Photo</CardTitle></CardHeader>
          <CardContent className="flex items-center gap-6">
            <Avatar className="h-28 w-28">
             <AvatarImage src={photoPreview || profileImage || undefined} />

              <AvatarFallback>Photo</AvatarFallback>
            </Avatar>
            <Button variant="outline" onClick={() => photoInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" /> Upload Photo
            </Button>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setPhotoPreview(URL.createObjectURL(file));
              }}
            />
          </CardContent>
        </Card>

        {/* BASIC INFO */}
        <Card className="rounded-2xl">
          <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <Input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
            <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <Input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
            <Input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
          </CardContent>
        </Card>

        {/* PROFESSIONAL */}
        <Card className="rounded-2xl">
          <CardHeader><CardTitle>Professional Details</CardTitle></CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <Select value={experienceLevel} onValueChange={v => setExperienceLevel(v as any)}>
              <SelectTrigger><SelectValue placeholder="Experience Level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ENTRY">Entry</SelectItem>
                <SelectItem value="MID">Mid</SelectItem>
                <SelectItem value="SENIOR">Senior</SelectItem>
                <SelectItem value="LEAD">Lead</SelectItem>
              </SelectContent>
            </Select>

            <Input className="md:col-span-2" placeholder="Technical Skills (comma separated)" value={technicalSkills} onChange={e => setTechnicalSkills(e.target.value)} />
            <Input className="md:col-span-2" placeholder="Soft Skills (comma separated)" value={softSkills} onChange={e => setSoftSkills(e.target.value)} />
            <Textarea className="md:col-span-2" rows={4} placeholder="Professional Summary" value={summary} onChange={e => setSummary(e.target.value)} />

            {/* Availability & Salary */}
            <Select value={availability} onValueChange={v => setAvailability(v)}>
              <SelectTrigger><SelectValue placeholder="Availability" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="IMMEDIATE">Immediate</SelectItem>
                <SelectItem value="1_MONTH">1 Month</SelectItem>
                <SelectItem value="2_MONTHS">2 Months</SelectItem>
              </SelectContent>
            </Select>

            <Input placeholder="Expected Salary Min" type="number" value={expectedSalaryMin} onChange={e => setExpectedSalaryMin(Number(e.target.value))} />
            <Input placeholder="Expected Salary Max" type="number" value={expectedSalaryMax} onChange={e => setExpectedSalaryMax(Number(e.target.value))} />

            <Select value={jobType} onValueChange={v => setJobType(v as any)}>
              <SelectTrigger><SelectValue placeholder="Job Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="FULL_TIME">Full Time</SelectItem>
                <SelectItem value="PART_TIME">Part Time</SelectItem>
                <SelectItem value="CONTRACT">Contract</SelectItem>
                <SelectItem value="INTERN">Intern</SelectItem>
                <SelectItem value="FREELANCE">Freelance</SelectItem>
              </SelectContent>
            </Select>

            <Select value={workMode} onValueChange={v => setWorkMode(v as any)}>
              <SelectTrigger><SelectValue placeholder="Work Mode" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ONSITE">Onsite</SelectItem>
                <SelectItem value="REMOTE">Remote</SelectItem>
                <SelectItem value="HYBRID">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* WORK EXPERIENCE */}
        {workExperiences.map((we, idx) => (
          <Card key={idx} className="rounded-2xl">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Work Experience {idx + 1}</CardTitle>
              <Button variant="destructive" onClick={() => removeWorkExperience(idx)}>Remove</Button>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Role" value={we.role} onChange={e => updateWorkExperience(idx, "role", e.target.value)} />
              <Input placeholder="Company" value={we.company} onChange={e => updateWorkExperience(idx, "company", e.target.value)} />
              <Input placeholder="Start Date" type="date" value={we.start_date} onChange={e => updateWorkExperience(idx, "start_date", e.target.value)} />
              <Input placeholder="End Date" type="date" value={we.end_date || ""} onChange={e => updateWorkExperience(idx, "end_date", e.target.value)} />
              <Textarea placeholder="Key Points (comma separated)" value={we.points.join(",")} onChange={e => updateWorkExperience(idx, "points", e.target.value.split(","))} className="md:col-span-2" />
            </CardContent>
          </Card>
        ))}
        <Button onClick={addWorkExperience}>Add Work Experience</Button>

        {/* EDUCATION */}
        {educations.map((edu, idx) => (
          <Card key={idx} className="rounded-2xl">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Education {idx + 1}</CardTitle>
              <Button variant="destructive" onClick={() => removeEducation(idx)}>Remove</Button>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Degree" value={edu.degree} onChange={e => updateEducation(idx, "degree", e.target.value)} />
              <Input placeholder="Institution" value={edu.institution} onChange={e => updateEducation(idx, "institution", e.target.value)} />
              <Input placeholder="Start Year" type="number" value={edu.start_year} onChange={e => updateEducation(idx, "start_year", Number(e.target.value))} />
              <Input placeholder="End Year" type="number" value={edu.end_year || ""} onChange={e => updateEducation(idx, "end_year", Number(e.target.value))} />
            </CardContent>
          </Card>
        ))}
        <Button onClick={addEducation}>Add Education</Button>

        {/* LINKS */}
        <Card className="rounded-2xl">
          <CardHeader><CardTitle>Links</CardTitle></CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <Input placeholder="Linkedin Url" value={linkedin} onChange={e => setLinkedin(e.target.value)} />
            <Input placeholder="Protfolio or github link" value={portfolio} onChange={e => setPortfolio(e.target.value)} />
          </CardContent>
        </Card>

        {/* RESUME */}
<Card className="rounded-2xl">
  <CardHeader><CardTitle>Resume</CardTitle></CardHeader>

  <CardContent className="flex flex-col gap-4">

    {/* Show current resume */}
{resumeUrl && (
  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border">
    <div>
      <p className="text-sm font-semibold">
        {getFileName(resumeUrl)}
      </p>
      <p className="text-xs text-gray-500">Uploaded resume</p>
    </div>

    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(resumeUrl, "_blank")}
      >
        View
      </Button>

      <Button asChild variant="secondary" size="sm">
        <a href={resumeUrl} download>
          Download
        </a>
      </Button>
    </div>
  </div>
)}



    <div className="flex items-center gap-6">
      <Button variant="outline" onClick={() => resumeInputRef.current?.click()}>
        <Upload className="h-4 w-4 mr-2" /> Replace Resume
      </Button>

      {resumeFile && <span>{resumeFile.name}</span>}

      <input
        ref={resumeInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setResumeFile(file);
        }}
      />
    </div>
  </CardContent>
</Card>


      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { BulletTextarea } from "@/app/_components/BulletTextarea";
import { useAuthStore } from "@/app/store/useAuthStore";

interface Category {
  id: string;
  category_name: string;
}

export default function PostNewJob() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [job_name, setJobName] = useState("");
  const [location, setLocation] = useState("");
  const [job_type, setJobType] = useState<"FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERN" | "FREELANCE">();
  const [work_mode, setWorkMode] = useState<"ONSITE" | "REMOTE" | "HYBRID">();
  const [experience_level, setExperienceLevel] = useState<"ENTRY" | "MID" | "SENIOR" | "LEAD">();
  const [salary_min, setSalaryMin] = useState<number | undefined>();
  const [salary_max, setSalaryMax] = useState<number | undefined>();
  const [salary_type, setSalaryType] = useState<"YEARLY" | "MONTHLY" | "HOURLY">("MONTHLY");
  const [deadline, setDeadline] = useState<string>();
  const [description, setDescription] = useState<string>("");
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [preferredQualifications, setPreferredQualifications] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    fetch("/api/jobcategory")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  const addTag = (value: string, list: string[], setList: any) => {
    const v = value.trim();
    if (v && !list.includes(v)) setList([...list, v]);
  };

  const removeTag = (value: string, list: string[], setList: any) =>
    setList(list.filter((v) => v !== value));

  const handleSubmit = async () => {
    if (!user?.token) return toast.error("You must be logged in.");

    if (!job_name || !location || !selectedCategory) {
      return toast.error("Please fill all required fields.");
    }

    const payload = {
      job_name,
      description: description.split("\n").filter(Boolean),
      location,
      category_id: selectedCategory,
      job_type,
      work_mode,
      experience_level,
      salary_min: salary_min ?? null,
      salary_max: salary_max ?? null,
      salary_type,
      deadline: deadline ? new Date(deadline) : null,
      responsibilities: responsibilities.filter(Boolean),
      requirements: requirements.filter(Boolean),
      preferred_qualifications: preferredQualifications.filter(Boolean),
      skills,
      benefits,
    };

    try {
      const res = await fetch("/api/postajob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to post job");

      toast.success("New job created successfully 🎉");
      setJobName("");
      setLocation("");
      setSelectedCategory("");
      setJobType(undefined);
      setWorkMode(undefined);
      setExperienceLevel(undefined);
      setSalaryMin(undefined);
      setSalaryMax(undefined);
      setSalaryType("MONTHLY");
      setDeadline("");
      setDescription("");
      setResponsibilities([]);
      setRequirements([]);
      setPreferredQualifications([]);
      setSkills([]);
      setBenefits([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to post job.");
    }
  };

  return (
    <div className="w-full flex justify-center bg-[#F1F5F9] py-10 px-4 font-playfair">
      <Card className="w-full max-w-[720px] p-6 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Post a New Job</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <Label>Job Title</Label>
            <Input value={job_name} onChange={(e) => setJobName(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Select value={job_type} onValueChange={(v) => setJobType(v as any)}>
              <SelectTrigger><SelectValue placeholder="Job Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="FULL_TIME">Full-time</SelectItem>
                <SelectItem value="PART_TIME">Part-time</SelectItem>
                <SelectItem value="CONTRACT">Contract</SelectItem>
                <SelectItem value="INTERN">Intern</SelectItem>
                <SelectItem value="FREELANCE">Freelance</SelectItem>
              </SelectContent>
            </Select>

            <Select value={work_mode} onValueChange={(v) => setWorkMode(v as any)}>
              <SelectTrigger><SelectValue placeholder="Work Mode" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ONSITE">Onsite</SelectItem>
                <SelectItem value="REMOTE">Remote</SelectItem>
                <SelectItem value="HYBRID">Hybrid</SelectItem>
              </SelectContent>
            </Select>

            <Select value={experience_level} onValueChange={(v) => setExperienceLevel(v as any)}>
              <SelectTrigger><SelectValue placeholder="Experience" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ENTRY">Entry</SelectItem>
                <SelectItem value="MID">Mid</SelectItem>
                <SelectItem value="SENIOR">Senior</SelectItem>
                <SelectItem value="LEAD">Lead</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger><SelectValue placeholder="Job Category" /></SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.category_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div>
            <Label>Location</Label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, Country" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <Label>Salary Min</Label>
              <Input type="number" value={salary_min ?? ""} onChange={(e) => setSalaryMin(Number(e.target.value))} />
            </div>
            <div>
              <Label>Salary Max</Label>
              <Input type="number" value={salary_max ?? ""} onChange={(e) => setSalaryMax(Number(e.target.value))} />
            </div>
          </div>

          <div>
            <Label>Application Deadline</Label>
            <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </div>

          <BulletTextarea label="Job Description" value={description} onChange={setDescription} />
          <BulletTextarea label="Responsibilities" value={responsibilities.join("\n")} onChange={(v) => setResponsibilities(v.split("\n"))} />
          <BulletTextarea label="Requirements" value={requirements.join("\n")} onChange={(v) => setRequirements(v.split("\n"))} />
          <BulletTextarea label="Preferred Qualifications" value={preferredQualifications.join("\n")} onChange={(v) => setPreferredQualifications(v.split("\n"))} />

          {[
            { label: "Skills", list: skills, setList: setSkills },
            { label: "Benefits", list: benefits, setList: setBenefits },
          ].map(({ label, list, setList }) => (
            <div key={label}>
              <Label>{label}</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {list.map((item) => (
                  <span key={item} className="bg-gray-200 px-2 py-1 rounded">
                    {item}
                    <button className="ml-2" onClick={() => removeTag(item, list, setList)}>×</button>
                  </span>
                ))}
              </div>
              <Input
                placeholder={`Add ${label} and press Enter`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag(e.currentTarget.value, list, setList);
                    e.currentTarget.value = "";
                  }
                }}
              />
            </div>
          ))}

          <Button className="w-full" onClick={handleSubmit}>
            Publish Job
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

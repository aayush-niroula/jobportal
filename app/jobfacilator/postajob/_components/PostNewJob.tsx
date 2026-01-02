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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAuthStore } from "@/app/store/useAuthStore";
import AddLineInput from "./AddLineInput";

interface Category {
  id: string;
  category_name: string;
}

export default function PostNewJob() {
  const user = useAuthStore((state) => state.user);

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("");

  const [jobName, setJobName] = useState("");
  const [location, setLocation] = useState("");

  const [jobType, setJobType] =
    useState<"FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERN" | "FREELANCE">();
  const [workMode, setWorkMode] =
    useState<"ONSITE" | "REMOTE" | "HYBRID">();
  const [experienceLevel, setExperienceLevel] =
    useState<"ENTRY" | "MID" | "SENIOR" | "LEAD">();

  const [salaryMin, setSalaryMin] = useState<number>();
  const [salaryMax, setSalaryMax] = useState<number>();
  const [salaryType, setSalaryType] =
    useState<"YEARLY" | "MONTHLY" | "HOURLY">("MONTHLY");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [preferredQualifications, setPreferredQualifications] = useState<
    string[]
  >([]);

  const [skills, setSkills] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    fetch("/api/jobcategory")
      .then((res) => res.json())
      .then(setCategories)
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  const addTag = (
    value: string,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    const v = value.trim();
    if (v && !list.includes(v)) setList([...list, v]);
  };

  const removeTag = (
    value: string,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    setList(list.filter((i) => i !== value));
  };

  const generateAIContent = async () => {
    if (!jobName) return toast.error("Job Name is required to generate AI content");

    setLoadingAI(true);

    try {
      const res = await fetch("/api/generate-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: jobName }),
      });

      if (!res.ok) throw new Error("Failed to generate AI content");

      const data = await res.json();
      console.log("AI Response:", data);

      setDescription(data.description || "");
      setResponsibilities(data.responsibilities || []);
      setRequirements(data.requirements || []);
      setPreferredQualifications(data.preferred_qualifications || []);

      toast.success("AI content generated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate AI content");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSubmit = async () => {
    if (!user?.token) return toast.error("You must be logged in");

    if (
      !jobName ||
      !location ||
      !categoryId ||
      !jobType ||
      !workMode ||
      !experienceLevel
    )
      return toast.error("Please fill all required fields");

    if (salaryMin && salaryMax && salaryMin > salaryMax)
      return toast.error("Salary min cannot be greater than salary max");

    const payload = {
      job_name: jobName,
      location,
      category_id: categoryId,
      job_type: jobType,
      work_mode: workMode,
      experience_level: experienceLevel,
      salary_min: salaryMin ?? null,
      salary_max: salaryMax ?? null,
      salary_type: salaryType,
      deadline: deadline ? new Date(deadline) : null,
      description: description
        .split("\n")
        .map((v) => v.trim())
        .filter(Boolean),
      responsibilities,
      requirements,
      preferred_qualifications: preferredQualifications,
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

      if (!res.ok) throw new Error();

      toast.success("Job posted successfully 🎉");
      setJobName("");
      setLocation("");
      setCategoryId("");
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
    } catch {
      toast.error("Failed to post job");
    }
  };

  return (
    <div className="flex justify-center bg-slate-100 py-10 px-4">
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold">
            Post a New Job
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Job Title */}
          <div>
            <Label>Job Title *</Label>
            <Input
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              placeholder="e.g. Frontend Developer"
            />
          </div>

          <Button
            onClick={generateAIContent}
            disabled={loadingAI}
            className="mb-4"
          >
            {loadingAI ? "Generating..." : "Generate AI Job Content"}
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={jobType} onValueChange={(v) => setJobType(v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FULL_TIME">Full Time</SelectItem>
                <SelectItem value="PART_TIME">Part Time</SelectItem>
                <SelectItem value="CONTRACT">Contract</SelectItem>
                <SelectItem value="INTERN">Intern</SelectItem>
                <SelectItem value="FREELANCE">Freelance</SelectItem>
              </SelectContent>
            </Select>

            <Select value={workMode} onValueChange={(v) => setWorkMode(v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Work Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ONSITE">Onsite</SelectItem>
                <SelectItem value="REMOTE">Remote</SelectItem>
                <SelectItem value="HYBRID">Hybrid</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={experienceLevel}
              onValueChange={(v) => setExperienceLevel(v as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ENTRY">Entry</SelectItem>
                <SelectItem value="MID">Mid</SelectItem>
                <SelectItem value="SENIOR">Senior</SelectItem>
                <SelectItem value="LEAD">Lead</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger>
              <SelectValue placeholder="Job Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.category_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div>
            <Label>Location *</Label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Kathmandu, Nepal"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Salary Min"
              value={salaryMin ?? ""}
              onChange={(e) => setSalaryMin(Number(e.target.value))}
            />
            <Input
              type="number"
              placeholder="Salary Max"
              value={salaryMax ?? ""}
              onChange={(e) => setSalaryMax(Number(e.target.value))}
            />
          </div>

          <Select value={salaryType} onValueChange={(v) => setSalaryType(v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Salary Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MONTHLY">Monthly</SelectItem>
              <SelectItem value="YEARLY">Yearly</SelectItem>
              <SelectItem value="HOURLY">Hourly</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <Textarea
            rows={6}
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <AddLineInput
            label="Responsibilities"
            placeholder="e.g. Build and maintain UI components"
            value={responsibilities}
            onChange={setResponsibilities}
          />

          <AddLineInput
            label="Requirements"
            placeholder="e.g. 2+ years of React experience"
            value={requirements}
            onChange={setRequirements}
          />

          <AddLineInput
            label="Preferred Qualifications"
            placeholder="e.g. Experience with Prisma or Next.js"
            value={preferredQualifications}
            onChange={setPreferredQualifications}
          />

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
                    <button
                      onClick={() => removeTag(item, list, setList)}
                      className="ml-2 text-red-500"
                    >
                      ×
                    </button>
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

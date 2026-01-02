"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";

const EditCompanyProfile = () => {
  const user = useAuthStore((state) => state.user);
  const [companyLogoFile, setCompanyLogoFile] = useState<File | null>(null);
  const [companyLogoUrl, setCompanyLogoUrl] = useState<string>("");
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [company_name, setCompanyName] = useState("");
  const [company_email, setCompanyEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("");
  const [department, setDepartment] = useState("");
  const [company_size, setCompanySize] = useState("");
  const [founded_year, setFoundedYear] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [company_location_link, setCompanyLocationLink] = useState("");
  const [website_link, setWebsiteLink] = useState("");
  const [company_description, setCompanyDescription] = useState("");
  const [features, setFeatures] = useState("");
 const [galleryPreviewUrls, setGalleryPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!user?.token) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/jobfacilator/profile", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const { data: profile } = await res.json();
        console.log(profile);
        
        if (!profile) return;

        setCompanyName(profile.company_name || "");
        setCompanyEmail(profile.company_email || "");
        setPhone(profile.phone || "");
        setIndustry(profile.industry || "");
        setDepartment(profile.department || "");
        setCompanySize(profile.company_size || "");
        setFoundedYear(profile.founded_year || "");
        setLocation(profile.location || "");
        setCompanyLocationLink(profile.company_location_link || "");
        setWebsiteLink(profile.website_link || "");
        setCompanyDescription(profile.company_description || "");
        setFeatures(profile.features?.join(", ") || "");

        setCompanyLogoUrl(profile.company_logo || "");
      } catch (error) {
        console.error("Fetch profile error:", error);
      }
    };

    fetchProfile();
  }, [user?.token]);

 
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    setCompanyLogoFile(file);
    setCompanyLogoUrl(URL.createObjectURL(file));
  };

  
const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  const fileArray = Array.from(files);
  setGalleryImages((prev) => [...prev, ...fileArray]);
  const previewUrls = fileArray.map((file) =>
    URL.createObjectURL(file)
  );

  setGalleryPreviewUrls((prev) => [...prev, ...previewUrls]);

  e.target.value = "";
};


 
  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();

      if (companyLogoFile) {
        formData.append("company_logo", companyLogoFile);
      }

      galleryImages.forEach((file) =>
        formData.append("gallery_images", file)
      );

      if (company_name) formData.append("company_name", company_name);
      if (company_email) formData.append("company_email", company_email);
      if (phone) formData.append("phone", phone);
      if (industry) formData.append("industry", industry);
      if (department) formData.append("department", department);
      if (company_size) formData.append("company_size", company_size);
      if (founded_year) formData.append("founded_year", String(founded_year));
      if (location) formData.append("location", location);
      if (company_location_link)
        formData.append("company_location_link", company_location_link);
      if (website_link) formData.append("website_link", website_link);
      if (company_description)
        formData.append("company_description", company_description);
      if (features) formData.append("features", features);

      const res = await fetch("/api/jobfacilator/profile", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong while updating the profile.");
    }
  };


  return (
    <Card className="w-full max-w-4xl mx-auto rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Edit Company Profile
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Logo */}
        <div className="space-y-3">
          <Label>Company Logo</Label>
          <div className="flex items-center gap-4">
            <img
              src={companyLogoUrl || "/placeholder-company.png"}
              alt="Company Logo"
              className="w-24 h-24 rounded-xl border object-contain bg-gray-50 p-2"
            />
            <Input type="file" accept="image/*" onChange={handleLogoUpload} />
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Company Name" value={company_name} setValue={setCompanyName} />
          <InputField label="Company Email" value={company_email} setValue={setCompanyEmail} />
          <InputField label="Phone" value={phone} setValue={setPhone} />
          <InputField label="Industry" value={industry} setValue={setIndustry} />
          <InputField label="Department" value={department} setValue={setDepartment} />
          <InputField label="Company Size" value={company_size} setValue={setCompanySize} />
          <Input
            type="number"
            placeholder="Founded Year"
            value={founded_year}
            onChange={(e) => setFoundedYear(Number(e.target.value))}
          />
        </div>

        {/* Location */}
        <InputField label="Location" value={location} setValue={setLocation} />
        <InputField
          label="Google Map Link"
          value={company_location_link}
          setValue={setCompanyLocationLink}
        />

        <InputField label="Website" value={website_link} setValue={setWebsiteLink} />

        <Textarea
          placeholder="Company Description"
          value={company_description}
          onChange={(e) => setCompanyDescription(e.target.value)}
        />

        <InputField
          label="Features (comma separated)"
          value={features}
          setValue={setFeatures}
        />
    {/* Gallery */}
<div className="space-y-4">
  <Label>Company Gallery</Label>

  <Input
    type="file"
    multiple
    accept="image/*"
    onChange={handleGalleryUpload}
  />

  {/* Preview newly uploaded images */}
  {galleryPreviewUrls.length > 0 && (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {galleryPreviewUrls.map((url, index) => (
        <div
          key={index}
          className="relative group rounded-xl overflow-hidden border"
        >
          <img
            src={url}
            alt="Gallery preview"
            className="w-full h-32 object-cover"
          />

          {/* Remove button */}
          <button
            type="button"
            onClick={() => {
              setGalleryPreviewUrls((prev) =>
                prev.filter((_, i) => i !== index)
              );
              setGalleryImages((prev) =>
                prev.filter((_, i) => i !== index)
              );
            }}
            className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )}
</div>


        <div className="flex justify-end gap-4 pt-6">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditCompanyProfile;


const InputField = ({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
}) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Input value={value} onChange={(e) => setValue(e.target.value)} />
  </div>
);

"use client";

import { useAuthStore } from "@/app/store/useAuthStore";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface EventType {
  id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number | string;
  field?: string;
  facilitator_id?: string;
  facilitator?: { company_name: string };
  category?: string;
  duration?: string;
  price?: string;
  prerequisites?: string[];
  whatYouWillLearn?: string[];
  requirments?: string[];
  image_url?: string;
}

interface EventFormProps {
  event?: EventType;
  onSubmit: () => void;
  onCancel?: () => void;
}

export const EventForm: React.FC<EventFormProps> = ({
  event,
  onSubmit,
  onCancel,
}) => {
  const user = useAuthStore((state) => state.user);

  const [formData, setFormData] = useState<EventType>({
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date || "",
    time: event?.time || "",
    location: event?.location || "",
    capacity: event?.capacity || 0,
    field: event?.field,
    category: event?.category || "",
    duration: event?.duration || "",
    price: event?.price || "",
    prerequisites: event?.prerequisites || [],
    whatYouWillLearn: event?.whatYouWillLearn || [],
    requirments: event?.requirments || [],
    image_url: event?.image_url || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (
    name: "prerequisites" | "whatYouWillLearn" | "requirments",
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value.split(",") }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64 = reader.result as string;

      try {
        const res = await fetch("/api/events/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ file: base64 }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to upload image");

        setFormData((prev) => ({ ...prev, image_url: data.url }));
      } catch (err) {
        console.error(err);
        alert("Error uploading image");
      }
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (event?.id) {
        const res = await fetch("/api/events/register", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventId: event.id, ...formData }),
        });
        if (!res.ok) throw new Error("Failed to update event");
      } else {
        const res = await fetch("/api/events", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Failed to create event");
      }
      onSubmit();
    } catch (err) {
      console.error(err);
      alert("Error submitting event");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold">
        {event ? "Edit Event" : "Create Event"}
      </h2>

      <div className="space-y-1">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="date">Date</Label>
          <Input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="time">Time</Label>
          <Input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="capacity">Capacity</Label>
        <Input
          id="capacity"
          name="capacity"
          type="number"
          value={formData.capacity}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category || ""}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {["Career Fair", "Workshop", "Training", "Webinar"].map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="field">Field</Label>
          <Select
            value={formData.field || ""}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, field: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a field" />
            </SelectTrigger>
            <SelectContent>
              {["Technology", "Business", "Marketing", "Design"].map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label>Prerequisites (comma separated)</Label>
        <Input
          value={formData.prerequisites?.join(",")}
          onChange={(e) => handleArrayChange("prerequisites", e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label>What You Will Learn (comma separated)</Label>
        <Input
          value={formData.whatYouWillLearn?.join(",")}
          onChange={(e) =>
            handleArrayChange("whatYouWillLearn", e.target.value)
          }
        />
      </div>

      <div className="space-y-1">
        <Label>Requirements (comma separated)</Label>
        <Input
          value={formData.requirments?.join(",")}
          onChange={(e) => handleArrayChange("requirments", e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label>Event Image</Label>
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {formData.image_url && (
          <img
            src={formData.image_url}
            alt="Event"
            className="w-48 h-32 object-cover mt-2 rounded"
          />
        )}
      </div>

      <div className="flex gap-2 mt-4">
        <Button type="submit" variant="default">
          {event ? "Update" : "Create"}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

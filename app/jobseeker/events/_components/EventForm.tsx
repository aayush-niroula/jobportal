"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";

interface EventFormProps {
  eventId: string;
  isRegistered: boolean;
  onSuccess?: () => void;
}

const EventForm = ({ eventId, isRegistered: initialRegistered, onSuccess }: EventFormProps) => {
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(initialRegistered);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const res = await fetch(`/api/events/register?eventId=${eventId}`,{
          method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        });
        const data = await res.json();
        setRegistered(data.registered);
      } catch (err) {
        console.error("Error checking registration:", err);
      }
    };
    checkRegistration();
  }, [eventId]);
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
   if(registered) return 
    setLoading(true);
    try {
      const res = await fetch("/api/events/register", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ eventId }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to register");

      setRegistered(true); 
      alert("Successfully registered for the event!");
      onSuccess?.(); 
      e.currentTarget.reset();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={registered}>
          {registered ? "Registered" : "Register"}
        </Button>
      </DialogTrigger>

      {!registered && (
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Event Registration</DialogTitle>
          </DialogHeader>

          <Card className="border-none shadow-none">
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={user?.name || ""}
                    required
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={user?.email || ""}
                    required
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={user?.phone || ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" name="notes" />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Registering..." : "Register Now"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default EventForm;

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Userdata = {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role_name: string;
};

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [role_name, setRoleName] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmpassword: false,
    role_name: false,
  });

  const router = useRouter();

  async function registerUser(userData: Userdata) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) throw new Error("failed to register");

    return res.json();
  }

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string) => /^\+?\d{7,15}$/.test(phone);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

 
    setErrors({
      name: false,
      email: false,
      phone: false,
      password: false,
      confirmpassword: false,
      role_name: false,
    });

    let hasError = false;

    if (!name) {
      setErrors((prev) => ({ ...prev, name: true }));
      toast.error("Full name is required");
      hasError = true;
    }

    if (!email) {
      setErrors((prev) => ({ ...prev, email: true }));
      toast.error("Email is required");
      hasError = true;
    } else if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: true }));
      toast.error("Please enter a valid email address");
      hasError = true;
    }

    if (phone && !validatePhone(phone)) {
      setErrors((prev) => ({ ...prev, phone: true }));
      toast.error("Please enter a valid phone number");
      hasError = true;
    }

    if (!password) {
      setErrors((prev) => ({ ...prev, password: true }));
      toast.error("Password is required");
      hasError = true;
    } else if (password.length < 8) {
      setErrors((prev) => ({ ...prev, password: true }));
      toast.error("Password must be at least 8 characters");
      hasError = true;
    }

    if (!confirmpassword) {
      setErrors((prev) => ({ ...prev, confirmpassword: true }));
      toast.error("Confirm password is required");
      hasError = true;
    } else if (password !== confirmpassword) {
      setErrors((prev) => ({ ...prev, password: true, confirmpassword: true }));
      toast.error("Password and confirm password do not match");
      hasError = true;
    }

    if (!role_name) {
      setErrors((prev) => ({ ...prev, role_name: true }));
      toast.error("Please select a role");
      hasError = true;
    }

    if (hasError) return;

    const data = { name, email, phone, password, role_name };

    try {
      await registerUser(data);
      toast.success("User registered successfully");
      router.push("/login");
    } catch (error: any) {
      if (error.message.includes("User already exists")) {
        setErrors((prev) => ({ ...prev, email: true }));
        toast.error("This email is already registered");
      }
      toast.error(error?.message || "Registration failed");
    }
  };

  const inputClass = (hasError: boolean) =>
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details below to register
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass(errors.name)}
              />
            </div>

          
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass(errors.email)}
              />
            </div>

           
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass(errors.phone)}
              />
            </div>

         
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass(errors.password)}
              />
              <p className="text-sm text-muted-foreground">
                Must be at least 8 characters.
              </p>
            </div>

      
            <div className="space-y-2">
              <Label htmlFor="confirm_password">Confirm Password</Label>
              <Input
                id="confirm_password"
                name="confirm_password"
                type="password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass(errors.confirmpassword)}
              />
            </div>

         
            <div className="space-y-2">
              <Label htmlFor="role">I am registering as</Label>
              <Select
                name="role"
                value={role_name}
                onValueChange={(value) => setRoleName(value)}
              >
                <SelectTrigger id="role" className={inputClass(errors.role_name)}>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JobSeeker">JobSeeker</SelectItem>
                  <SelectItem value="JobFacilitator">JobFacilitator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleRegister} type="submit" className="w-full">
              Register
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/login" className="underline hover:text-primary">
              Login here
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

"use client";

import { useAuthStore } from "@/app/store/useAuthStore";
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
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type LoginData = {
  email: string;
  password: string;
  role_name: string;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role_name, setRoleName] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    role_name: false,
  });

   const params = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function login(userData: LoginData) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data?.error || "Login failed");

    return data;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();


    setErrors({
      email: false,
      password: false,
      role_name: false,
    });

    let hasError = false;

  
    if (!email) {
      setErrors((prev) => ({ ...prev, email: true }));
      toast.error("Email is required");
      hasError = true;
    } else if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: true }));
      toast.error("Please enter a valid email address");
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

    if (!role_name) {
      setErrors((prev) => ({ ...prev, role_name: true }));
      toast.error("Please select a role");
      hasError = true;
    }

    if (hasError) return;

    const data = {
      email,
      password,
      role_name,
    };

    try {
      const res = await login(data);
      console.log(res);
      

      setUser({
        ...res.user,
        token: res.token,
      });

      toast.success("User logged in successfully");

     
      if (res.user.role === "JobFacilitator") {
        router.push("/jobfacilator");
      } else if (res.user.role === "JobSeeker") {
        router.push("/jobseeker/Dashboard");
      } else {
        router.push("/");
      }

      router.push(redirect)
    } catch (error: any) {
      const msg = error.message || "Login failed";

      if (msg.includes("User not found") || msg.includes("Role name not matched")) {
        setErrors((prev) => ({ ...prev, email: true, role_name: true }));
      } else if (msg.includes("password")) {
        setErrors((prev) => ({ ...prev, password: true }));
      }

      toast.error(msg);
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
            Login with your account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details below to login
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email */}
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

            {/* Password */}
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

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role">I am logging in as</Label>
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

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <a href="/register" className="underline hover:text-primary">
              Register here
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

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

type Userdata ={
  name: string;
  email: string;
  phone?: string;
  password: string;
  role_name: string;
}

export default function RegisterPage() {
  const [name,setName]= useState("")
  const [email,setEmail]=useState("")
  const [phone,setPhone]=useState("")
  const [password,setPassword]=useState("")
  const [confirmpassword,setConfirmPassword]=useState("")
  const [role_name,setRoleName]=useState('')
 const router = useRouter()

  async function registerUser(userData:Userdata) {
    const res = await fetch("/api/auth/register",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(userData)
    })

    if(!res.ok) throw new Error("failed to register")

    return res.json()
  }

  const handleRegister = async (e: React.FormEvent)=>{
    e.preventDefault();
   if(!name || !email || !phone || !password || !confirmpassword){
    return toast.error("All fields are required")
   }
   if(password !== confirmpassword){
    return toast.message("Password and confirnm password doesnot match")
   }
   if(!role_name){
    return toast.message("please select the role_name")
  }
  const data = {name,email,phone,password,role_name}
try {
  
  const res =await registerUser(data)
   toast.success("User registered successfully")
    router.push('/login')
   
  
} catch (error) {
  
}

  }
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
                onChange={(e)=>setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder=""
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Must be at least 8 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm_password">Confirm Password</Label>
              <Input
                id="confirm_password"
                name="confirm_password"
                type="password"
                required
                value={confirmpassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role">I am registering as</Label>
              <Select
               name="role"
               value={role_name}
               onValueChange={(value)=>setRoleName(value)}
                required>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JobSeeker">JobSeeker</SelectItem>
                  <SelectItem value="JobFacilitator">
                    JobFacilitator
                  </SelectItem>
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
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type LoginData ={
  email:string
  password:string
  name?:string
  role_name:string
}

export default function Login() {
  const [email,setEmail]=useState("")
  const [password,setPassword]= useState("")
  const [confirmpassword,setConfirmPassword]=useState("")
  const [role_name,setRoleName] = useState("")
  const setUser = useAuthStore((state)=>state.setUser)
  const router = useRouter()

  async function login(userData:LoginData) {
    const res = await fetch("/api/auth/login",{
      method:"POST",
      headers: {
        "ContentType":"application/json",
       },
      body:JSON.stringify(userData)
    })
    if(!res.ok) throw new Error("failed to login")
    return res.json()
    
  }
  const handleLogin =async(e:React.FormEvent)=>{
    e.preventDefault();
    if(!email ||!password || !confirmpassword ||  !role_name){
      toast.error("All fields are required");     
    }
    if(password !== confirmpassword){
      toast.error("Password and confirm password donot match")
    }
     const data = {email,password,role_name}
     try {
      const res = await login(data)
      setUser({...res.user,
       token:res.token
      })

      if(res.user.role ==="JobFacilitator"){
        router.push('/jobfacilator')
      }
      else if(res.user.role==="JobSeeker"){
        router.push('/jobseeker/Dashboard')
      }
      else{
        router.push('/')
      }
     toast.success('User logged in successfully')
   

     } catch (error) {
      console.log(error);
      
     }
  }
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
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
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
              <Label htmlFor="role">I am logging in as</Label>
              <Select
               name="role"
                required
                onValueChange={(value)=>setRoleName(value)}
                value={role_name}
                >
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

            <Button type="submit" className="w-full">
             Login
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Donot have an account?{" "}
            <a href="/register" className="underline hover:text-primary">
              Register here here
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
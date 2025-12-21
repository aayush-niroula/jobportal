"use client"
import Navbar from "./_components/Navbar"
import JobSeekerNavbar from "./jobseeker/components/JobSeekerNavbar"
import JobFacilatorNavbar from "./jobfacilator/_components/JobFacilatorNavbar"
import { useAuthStore } from "./store/useAuthStore"
const NavbarGlobal = () => {
const user = useAuthStore((state)=>state.user)
 if(!user) return <Navbar/>
 if(user.role ==="JobSeeker") return <JobSeekerNavbar/>
 if(user.role ==="JobFacilitator") return <JobFacilatorNavbar/>
  return (
    <div><Navbar/></div>
  )
}

export default NavbarGlobal
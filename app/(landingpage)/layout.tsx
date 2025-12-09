import React from 'react'
import Navbar from '../_components/Navbar'
import JobSeekerNavbar from '../jobseeker/components/JobSeekerNavbar'


const layout = ({children}: {children: React.ReactNode}) => {
    const islogin = true
  return (
    <div>
        {
         islogin ? (
        <JobSeekerNavbar/>
            ):(
             <Navbar/>
            )
        }
     {children}
    </div>
  )
}

export default layout
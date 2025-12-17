import React from 'react'
import Navbar from '../_components/Navbar'
import JobSeekerNavbar from '../jobseeker/components/JobSeekerNavbar'


const layout = ({children}: {children: React.ReactNode}) => {
  
  return (
    <div>
       <Navbar/> 
     {children}
    </div>
  )
}

export default layout
import React from 'react'
import Navbar from '../_components/Navbar'
import JobSeekerNavbar from '../jobseeker/components/JobSeekerNavbar'
import NavbarGlobal from '../Navbar'


const layout = ({children}: {children: React.ReactNode}) => {
  
  return (
    <div>
       <NavbarGlobal/> 
     {children}
    </div>
  )
}

export default layout
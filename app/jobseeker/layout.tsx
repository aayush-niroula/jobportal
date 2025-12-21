import React from 'react'
import JobSeekerNavbar from './components/JobSeekerNavbar'
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
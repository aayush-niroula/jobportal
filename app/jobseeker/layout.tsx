import React from 'react'
import JobSeekerNavbar from './components/JobSeekerNavbar'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
    <JobSeekerNavbar/>
     {children}
    </div>
  )
}

export default layout
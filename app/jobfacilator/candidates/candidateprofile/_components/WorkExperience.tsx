import { Circle } from 'lucide-react'
import React from 'react'

const WorkExperience = () => {
    const experience = ['Led development of key features for enterprise web application','Collaborated with cross-functional teams to deliver projects on time','Mentored junior developers and conducted code reviews','Implemented CI/CD pipelines and improved deployment processes ']
  return (
    <div className='font-playfair flex flex-col gap-4'>
        <div className='bg-[#FAF2F2]'>
            <h1 className='text-2xl font-bold'>Senior Software Developer</h1>
            <p className='text-md font-light'>Tech Corp Inc</p>
            <p>2022-2024</p>
            <div className='flex flex-col gap-2'>
                {experience.map((value,index)=>(
                 <p className='flex gap-2 items-center' key={index}><span><Circle size={15}/></span>{value}</p>
                ))}
            </div>
        </div>
        <div className='bg-[#FAF2F2]'>
            <h1 className='text-2xl font-bold'>Senior Software Developer</h1>
            <p className='text-md font-light'>Tech Corp Inc</p>
            <p>2022-2024</p>
            <div className='flex flex-col gap-2'>
                {experience.map((value,index)=>(
                 <p className='flex gap-2 items-center' key={index}><span><Circle size={15}/></span>{value}</p>
                ))}
            </div>
        </div>
        <div className='bg-[#FAF2F2]'>
            <h1 className='text-2xl font-bold'>Senior Software Developer</h1>
            <p className='text-md font-light'>Tech Corp Inc</p>
            <p>2022-2024</p>
            <div className='flex flex-col gap-2'>
                {experience.map((value,index)=>(
                 <p className='flex gap-2 items-center' key={index}><span><Circle size={15}/></span>{value}</p>
                ))}
            </div>
        </div>
    </div>
  )
}

export default WorkExperience
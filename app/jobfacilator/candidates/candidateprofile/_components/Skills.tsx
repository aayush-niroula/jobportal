import React from 'react'

const Skills = () => {

const skills = ['JavaScript','TypeScript','React','Nodejs','Python','MongoDb','Postgress','Docker','Kubernetes']
const softskills =['TeamLeaderShip','ProjectManagement','Communication','ProblemSolving']
  return (
    <div className='bg-white border border-black rounded-2xl max-w-[763px] h-auto p-10 flex flex-col gap-2 font-playfair'>
        <h1 className='text-2xl font-bold'>Skills and Technology</h1>
        <p className='text-xl font-medium'>Technical Skills</p>
        <div className='grid grid-cols-3 gap-2 place-content-center p-10'>
            {skills.map((value,index)=>(
                <p  className='border border-black p-2 rounded-full' key={index}>{value}</p>
            ))}
        </div>

       <h1>SoftSkills</h1>
        <div className='grid grid-cols-2 gap-4'>
            {
                 softskills.map((value,index)=>(
                    <p key={index} className='bg-green-400 p-2 rounded-full w-50 text-center'>{value}</p>
                ))
            }
        </div>
    
    </div>

  )
}

export default Skills
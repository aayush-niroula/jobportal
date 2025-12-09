"use client"
import Footer from '@/app/_components/Footer'
import { Button } from '@/components/ui/button'
import { ArrowRight, Bookmark, Building, Circle, MapPin, Share2, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const ApplyNow = () => {
    const router = useRouter()
  return (
    <div className='main-div bg-[#F1F5F9] p-20 font-playfair'>

  
    <div className='flex justify-center gap-20'>
        {/* two left section starts  */}
        <div className='flex flex-col gap-4 justify-center'>
        <div className='flex bg-white h-auto max-w-[640px] p-6 justify-between'>
            <div>
               <img src="/Logo.jpg" alt="logoimage"className='object-contain h-[100px]' /> 
            </div>
            <div className='flex flex-col gap-3'>
                <h1>Job Title</h1>
                <p>Lenevo</p>
                <div className='flex gap-2'>
                    <p>USA.Los Angeles</p>
                    <p>Full time</p>
                    <p>Posted 3 days ago</p>
                    
                </div>
            </div>
            <div className='flex flex-col gap-2 justify-center'>
                <div className='flex gap-2'>
                    <Bookmark/>
                    <Share2/>
                </div>
                <Button>Apply</Button>
            </div>
        </div>
        <div className='min-w-[640px] max-h-[451px] bg-white rounded-2xl p-6 flex flex-col gap-4'>
            <h1 className='font-medium text-4xl'>Salary Benefits</h1>
            <div className='flex gap-4'>
                <div className='p-2 border border-black rounded-2xl flex flex-col gap-2'>
                    <h3>Salary Range</h3>
                    <h1>$80000-120000</h1>
                    <p>per hour</p>
                </div>
                <div className='p-2 border border-black rounded-2xl flex flex-col gap-2'>
                    <h3>Application Deadline </h3>
                    <h1>Dec 20 ,2025</h1>
                    <p>23 days remaining</p>
                </div>
            </div>
            <h1 className='text-4xl font-bold'>Benefits Package</h1>
            <div className='flex gap-6'>
            <div>
                <p> Health Insurance </p>
                <p>Bonus</p>
                <p>Lunch and Breakfast</p>
            </div>
            <div>
                <p>Health Insurance</p>
                <p>Bonus</p>
                <p>Lunch and Breakfast</p>
            </div>
            </div>
        </div>
        </div>
    

        {/* right section  */}
            <div className='max-w-lg bg-white p-10 '>
            <div className='flex flex-col  items-center gap-4'>
            <h1 className='font-medium text-4xl'>About the company</h1>
            <img src="/Logo.jpg" alt="Logo of the company"  className='object-cover max-h-[196px]'/>
            <h1 className='text-2xl font-light'>Lenevo Group Limited</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et quae est vel sint sunt non modi veritatis perferendis ipsa, nemo alias deleniti officia doloremque quam ex consequuntur, laboriosam accusantium voluptatibus.</p>
          </div>
               <div className='flex gap-2 p-4'>
                <div>
                    <Building/>
                </div>
                <div>
                    <p>Industry</p>
                    <h1 className='font-medium text-xl'>Hardware</h1>
                </div>
            </div>
               <div className='flex gap-2 p-4'>
                <div>
                   <User />
                </div>
                <div>
                    <p>Industry</p>
                    <h1 className='font-medium text-xl'>Hardware</h1>
                </div>
            </div>
               <div className='flex gap-2 p-4'>
                <div>
                   <MapPin />
                </div>
                <div>
                    <p>Industry</p>
                    <h1 className='font-medium text-xl'>Hardware</h1>
                </div>
            </div>
<div className='flex justify-center items-center'>

    <Button className='p-6' onClick={()=>router.push('/jobseeker/viewcompany')}>Company Profile <span><ArrowRight/></span></Button>
</div>

        </div>
    </div>
    {/* buttom section starts here  */}
    <div className='h-[752] w-full bg-white mt-20 p-10 flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
        <h1 className='font-medium text-2xl'>Job Description</h1>
        <p>[Company Name] is looking for a talented and motivated [Job Title] to join our growing team. In this role, you will be responsible for developing and maintaining high-quality software solutions that meet our clients' needs.</p>
        </div>

        <div className='flex flex-col gap-2'>
            <h1 className='font-medium text-2xl'>Key Responsibilities</h1>
            <p className='flex items-center gap-2'><span><Circle size={15}/></span>Design, develop, and maintain software applications</p>
            <p className='flex items-center gap-2'><span><Circle size={15}/></span>Design, develop, and maintain software applications</p>
            <p className='flex items-center gap-2'><span><Circle size={15}/></span>Design, develop, and maintain software applications</p>
            <p className='flex items-center gap-2'><span><Circle size={15}/></span>Design, develop, and maintain software applications</p>
        </div>

        <div className='flex flex-col gap-2'>
            <h1 className='font-medium text-2xl'>Required Qualifications</h1>
            <p className='flex items-center gap-2'><span><Circle size={15}/></span>Bachelor's degree in Computer Science or related field</p>
            <p className='flex items-center gap-2'><span><Circle size={15}/></span>Bachelor's degree in Computer Science or related field</p>
            <p className='flex items-center gap-2'><span><Circle size={15}/></span>Bachelor's degree in Computer Science or related field</p>
            <p className='flex items-center gap-2'><span><Circle size={15}/></span>Bachelor's degree in Computer Science or related field</p>
            <p className='flex items-center gap-2'><span><Circle size={15}/></span>Bachelor's degree in Computer Science or related field</p>
        </div>

        <div className='flex flex-col gap-2'>
            <h1 className='font-medium text-2xl'>Preferred Qualifications</h1>
           <p className='flex items-center gap-2'><span><Circle size={15}/></span>Master's degree in Computer Science</p>
           <p className='flex items-center gap-2'><span><Circle size={15}/></span>Master's degree in Computer Science</p>
           <p className='flex items-center gap-2'><span><Circle size={15}/></span>Master's degree in Computer Science</p>
           <p className='flex items-center gap-2'><span><Circle size={15}/></span>Master's degree in Computer Science</p>

        </div>


    </div>
    <Footer/>
      </div>
  )
}

export default ApplyNow
import React from 'react'

const ChooseUsBox = () => {
  return (
    <div className='bg-white border border-black
        w-full
        flex flex-col items-center text-center
        gap-4
        p-4 sm:p-6 md:p-8
        rounded-lg'>
        <img src="why.jpg" alt="why-choose-us" className='object-cover h-20 w-20 sm:h-24 sm:w-24 rounded-full'/>
        <h1 className='md:text-2xl text-lg sm:text-xl font-medium'>Modern Design</h1>
        <p className='font-light text-sm sm:text-base max-w-[280px] sm:max-w-[320px]'>Our website is very modern and atrractive to look and userfriendly</p>
    </div>
  )
}

export default ChooseUsBox
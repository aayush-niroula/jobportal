import React from 'react'

const ChooseUsBox = () => {
  return (
    <div className='max-h-[300px] min-w-[300px] bg-white border border-black flex flex-col justify-center items-center gap-4 p-4'>
        <img src="why.jpg" alt="why-choose-us" className='object-cover h-[100px] w-[100px] rounded-full'/>
        <h1 className='text-2xl font-medium'>Modern Design</h1>
        <p className='font-light text-sm'>Our website is very modern and atrractive to look and userfriendly</p>
    </div>
  )
}

export default ChooseUsBox
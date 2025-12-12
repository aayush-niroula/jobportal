import React from 'react'

const CompanyInformation = () => {
  return (
    <div className='bg-white p-8 w-auto lg:max-w-[755px] h-auto rounded-xl'>
        <h1>Company Information</h1>
        <div>
            <h1 className='lg:text-xl text-sm font-medium'>Company Name</h1>
            <input type="text" className='lg:p-2 p-1 w-full border border-black ' />
        </div>
        <div>
            <h1 className='lg:text-xl text-sm font-medium'>Business Registration Number</h1>
            <input type="text" className='lg:p-2 w-full border border-black p-1' />
        </div>
        <div className='flex md:justify-between gap-4 lg:justify-between'>
            <div>
            <h1 className='lg:text-xl text-sm font-medium'>Company Email</h1>
            <input type="text" className='lg:p-2 w-full border border-black p-1' />
            </div>
            <div>
            <h1 className='lg:text-xl text-sm font-medium'>Company Phone</h1>
            <input type="text" className='lg:p-2 w-full border border-black p-1' />
            </div>
        </div>
        <div>
            <h1 className='lg:text-xl text-sm font-medium'>Company Address</h1>
            <input type="text" className='lg:p-2 w-full border border-black p-1' />
        </div>
        <div>
            <h1 className='lg:text-xl text-sm font-medium'>Company Website link</h1>
            <input type="text" className='lg:p-2 w-full border border-black p-1' />
        </div>
    </div>
  )
}

export default CompanyInformation
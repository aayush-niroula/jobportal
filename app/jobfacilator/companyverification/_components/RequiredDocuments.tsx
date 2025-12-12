import React from 'react'

const RequiredDocuments = () => {
  return (
    <div className='max-w-[335px] bg-white p-8  flex flex-col gap-4 rounded-2xl'>
        <h1 className='font-medium text-2xl'>Required Documents</h1>
        <p className='flex gap-4'><span><input type="checkbox" size={20}/></span> Business License</p>
        <p className='flex gap-4'><span><input type="checkbox" size={20}/></span> Registration Certificate</p>
        <p className='flex gap-4'><span><input type="checkbox" size={20}/></span> Tax ID Document</p>
       

    </div>
  )
}

export default RequiredDocuments
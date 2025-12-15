import React from 'react'
interface Category{
  categoryname:string,
  jobsno:number
}
const CategoryBox = ({categoryname,jobsno}:Category) => {
  return (
    <div className='w-full sm:w-[220px] lg:w-[280px] bg-white rounded-2xl border border-gray-200 font-playfair overflow-hidden shadow-sm flex flex-col items-center'>
      <div className='w-full h-40 sm:h-48 lg:h-58 overflow-hidden'>
        <img src="Accounting.jpg" alt=""  className='object-cover h-full w-full' />
      </div>
      <div className='p-4 flex flex-col gap-1 items-center text-center'>
        <h1 className='font-medium smLtext-xl lg:text-xl text-center'>{categoryname}</h1>
        <p className='text-sm sm:text-base font-light '>{jobsno} jobs</p>

      </div>
    </div>
  )
}

export default CategoryBox
import React from 'react'

interface InformationProps {
    title: string,
    number: number,
    lastline: string
}

const Information = ({title, number, lastline}: InformationProps) => {
  return (
    <div className='min-w-[314px] max-h-[125px] font-playfair flex flex-col bg-[#F8FAFC] hover:bg-linear-to-br hover:from-white hover:to-[#E2E8F0] gap-2 p-4 rounded-2xl transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] cursor-pointer'>
      <h3 className='font-bold text-md'>{title}</h3>
      <p className='text-4xl font-extrabold'>{number}</p>
      <p className='text-sm font-light'>{lastline}</p>
    </div>
  )
}

export default Information
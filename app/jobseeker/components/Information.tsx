import React from 'react'

interface InformationProps {
    title: string,
    number: number,
}

const Information = ({title, number}: InformationProps) => {
  return (
    <div className='min-w-78.5 max-h-31.25 font-playfair flex flex-col bg-white border-2 border-black gap-3 p-5 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer group'>
      <h3 className='font-bold text-sm uppercase tracking-wide text-gray-600'>{title}</h3>
      <p className='text-4xl font-extrabold text-black group-hover:scale-105 transition-transform'>{number}</p>
    
    </div>
  )
}

export default Information
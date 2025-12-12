import { Button } from '@/components/ui/button'
import CompanyInformation from '../_components/CompanyInformation'
import VerificationDocuments from '../_components/VerificationDocuments'
import VerificationRequired from '../_components/VerificationRequired'
import RequiredDocuments from '../_components/RequiredDocuments'
import VerificationProcess from '../_components/VerificationProcess'
import Footer from '@/app/_components/Footer'
const page = () => {
  return (
    <div className='bg-[#F1F5F9] font-playfair p-10 flex flex-col gap-8 '>
      <div className='flex flex-col gap-2 mb-4 text-center'> 
      <h1 className='text-2xl font-medium'>Company verification</h1>
      <p className='font-light text-sm'>Verify your company to unlock full access and build trust with job seekers</p>
      </div>
      <div className='flex justify-center'>
      <VerificationRequired/>
      </div>
  

      <div className='grid gap-6 lg:grid-cols-[1fr_350px] max-w-[1200px] mx-auto '>
        <div className='flex flex-col gap-6'>
          <CompanyInformation/>
          <VerificationDocuments/>
          <div className='bg-white rounded-2xl p-6 max-w-[755px]'>
            <h1>Additional Information</h1>
            <textarea className='lg:w-full lg:h-full md:w-full h-auto border border-black p-2'/>
          </div>
          <div className='flex justify-between max-w-[755px]'>
            <Button variant={'outline'} className='p-6'>Cancel</Button>
            <Button className='p-6'>Submit</Button>
          </div>
        </div>
        {/* right section suru */}
        <div className='flex flex-col items-center w-auto  gap-4 lg:w-[335px] lg:flex lg:gap-8 '>
          <RequiredDocuments/>
          <VerificationProcess/>

          <div className='bg-white border h-auto lg:max-h-[300] border-black rounded-2xl flex flex-col gap-4 p-6 justify-center '>
            <h1 className='text-2xl font-bold'>Need Help</h1>
            <p>Contact our verification team if you have questions</p>
            <Button className='p-6'>Contact Support</Button>
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default page
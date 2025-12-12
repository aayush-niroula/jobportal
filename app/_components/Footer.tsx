import { Apple } from "lucide-react"

const Footer = () => {
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center lg:max-h-[462px] lg:flex lg:justify-evenly lg:items-center p-4 font-playfair pb-20 bg-white">
        <div className="flex flex-col justify-center gap-2">
            <h1 className="text-2xl font-medium">About Company</h1>
            <h3>Contact us</h3>
            <h3>Terms and Conditions</h3>
            <h3>Privacy & Policy</h3>
            <h3>Contact us</h3>
        </div>
        <div>
            <div className="flex flex-col justify-center gap-2">
                <h1 className="text-2xl font-medium">For Job Seeker</h1>
                <h3>upload resume</h3>
                <h3>Seeker Dashboard</h3>
                <h3>Browse Jobs</h3>
                <h3>Contact us</h3>
            </div>
        </div>
        <div>
            <div className="flex flex-col justify-center gap-2">
                <h1 className="text-2xl font-medium">For Job Facilitator</h1>
                <h3>Contact us</h3>
                <h3>Terms and Conditions</h3>
                <h3>Privacy & Policy</h3>
                <h3>Contact us</h3>
            </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 ">
            <h1 className="text-2xl ">Download app</h1>
        <div className="flex gap-2 justify-center items-center bg-black text-white p-4 border-8 border-gray-300 max-h-[77px]">
            <Apple/>
            <div>
            <h3 className="text-md font-medium">Download on</h3>
            <h1 className="text-2xl font-bold">App Store</h1>
            </div>
            <div>
                
            </div>
        </div>
        <div className="flex gap-2 justify-center items-center bg-black text-white p-4 border-8 border-gray-300 max-h-[77px]">
            <Apple/>
            <div>
            <h3 className="text-md font-medium">Download on</h3>
            <h1 className="text-2xl font-bold">PlayStore</h1>
            </div>
            <div>
                
            </div>
        </div>

        </div>
    </div>
  )
}

export default Footer
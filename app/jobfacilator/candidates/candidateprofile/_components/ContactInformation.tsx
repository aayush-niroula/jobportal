import { Globe, MapPin, Phone } from "lucide-react"
 type Contact={
    email:string,
    phone:number,
    location:string
 }

const ContactInformation = ({email,phone,location}:Contact) => {
  return (
    <div className="p-10 bg-white border border-black rounded-2xl flex flex-col gap-6 min-w-[460px] h-auto font-playfair">
        <div className="flex flex-col gap-2">
            <p className="flex gap-2 font-bold text-xl"><span><Globe/></span>Email</p>
            <p className="text-gray-700 font-medium">{email}</p>
        </div>
        <div className="flex flex-col gap-2">
            <p className="flex gap-2 font-bold text-xl"><span><Phone/></span>Phone</p>
            <p className="text-gray-700 font-medium">{phone}</p>
        </div>
        <div className="flex flex-col gap-2">
            <p className="flex gap-2 font-bold text-xl"><span><MapPin/></span>Location</p>
            <p className="text-gray-700 font-medium">{location}</p>
        </div>

    </div>
  )
}

export default ContactInformation
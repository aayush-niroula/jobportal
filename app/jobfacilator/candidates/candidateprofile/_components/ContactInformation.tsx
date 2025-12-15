import { Globe, MapPin, Phone } from "lucide-react";

type Contact = {
  email: string;
  phone: number | string;
  location: string;
};

const ContactInformation = ({ email, phone, location }: Contact) => {
  return (
    <div className="
      w-full
      bg-white
      border border-gray-200
      rounded-2xl
      font-playfair
      p-4 sm:p-6 lg:p-8
      flex flex-col
      gap-5
      lg:max-w-[460px]
    ">

      <div className="flex items-start gap-3">
        <Globe className="w-5 h-5 mt-1 text-gray-600 shrink-0" />
        <div>
          <p className="font-bold text-base sm:text-lg">Email</p>
          <p className="text-gray-700 text-sm sm:text-base break-all">
            {email}
          </p>
        </div>
      </div>


      <div className="flex items-start gap-3">
        <Phone className="w-5 h-5 mt-1 text-gray-600 shrink-0" />
        <div>
          <p className="font-bold text-base sm:text-lg">Phone</p>
          <p className="text-gray-700 text-sm sm:text-base">
            {phone}
          </p>
        </div>
      </div>

   
      <div className="flex items-start gap-3">
        <MapPin className="w-5 h-5 mt-1 text-gray-600 shrink-0" />
        <div>
          <p className="font-bold text-base sm:text-lg">Location</p>
          <p className="text-gray-700 text-sm sm:text-base">
            {location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;

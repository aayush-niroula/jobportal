import { Apple } from "lucide-react"

const Footer = () => {
  return (
    <footer className="w-full bg-white py-12 px-6 md:px-10 lg:px-16 xl:px-24">
    <div className="max-w-7xl mx-auto grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 font-playfair">
            About Company
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-black transition cursor-pointer">Contact Us</li>
            <li className="hover:text-black transition cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-black transition cursor-pointer">Privacy Policy</li>
            <li className="hover:text-black transition cursor-pointer">Help Center</li>
          </ul>
        </div>
       <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 font-playfair">
           For Job Seeker
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-black transition cursor-pointer">Upload resume</li>
            <li className="hover:text-black transition cursor-pointer">Seeker Dashboard</li>
            <li className="hover:text-black transition cursor-pointer">Browse Jobs</li>
            <li className="hover:text-black transition cursor-pointer">Contact us</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 font-playfair">
           For Job Facilator
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-black transition cursor-pointer">Contact us</li>
            <li className="hover:text-black transition cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-black transition cursor-pointer">Privacy Policy</li>
            <li className="hover:text-black transition cursor-pointer">Help Center</li>
          </ul>
        </div>
      <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 font-playfair">
            Download Ap
          </h2>

          <div className="flex flex-col gap-4">
            {/* App Store Button */}
            <a
              href="#"
              className="flex items-center gap-4 bg-black text-white px-6 py-4 rounded-2xl hover:bg-gray-900 transition transform hover:scale-105 shadow-lg"
            >
              <Apple className="w-10 h-10" />
              <div>
                <p className="text-xs leading-none">Download on the</p>
                <p className="text-xl font-bold leading-tight">App Store</p>
              </div>
            </a>

            {/* Play Store Button */}
            <a
              href="#"
              className="flex items-center gap-4 bg-black text-white px-6 py-4 rounded-2xl hover:bg-gray-900 transition transform hover:scale-105 shadow-lg"
            >
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.609 22.186c-.212-.708-.309-1.457-.309-2.232V4.046c0-.775.097-1.524.309-2.232zm1.232 18.692L12 13.5l2.693-2.693L6.138 7.077c-.425.358-.796.77-1.097 1.232v8.77c.301.462.672.874 1.097 1.232zm15.963-9.42l-4.314-2.486-3.124 3.124 3.124 3.124 4.314-2.486c.618-.356.618-1.244 0-1.6zM5.54 3.076l11.616 6.696 1.348-.78c.928-.536.928-1.872 0-2.408l-1.348.78L5.54 19.876c-.928-.536-1.348-1.872-.464-2.872L15.692 12 5.076 5.004c-.884-1  .464-2.336.464-2.928z"/>
              </svg>
              <div>
                <p className="text-xs leading-none">Get it on</p>
                <p className="text-xl font-bold leading-tight">Google Play</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
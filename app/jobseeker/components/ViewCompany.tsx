import Footer from "@/app/_components/Footer";
import { Button } from "@/components/ui/button";
import { Bookmark, BriefcaseBusiness, Building, Calendar, Globe, MapPin, Phone, Users } from "lucide-react";

const ViewCompany = () => {
  return (
    <div className="font-playfair flex flex-col justify-center items-center gap-8 pt-8 ">
      {/* first section starts */}
      <div className="h-auto max-w-[1248px] bg-white flex gap-4 justify-between p-10 rounded-2xl">
        <div>
          <img
            src="/Logo.jpg"
            alt=""
            className="object-contain max-h-[103px]"
          />
        </div>
        <div>
          <h1 className="font-medium text-2xl">Udemy</h1>
          <div className="flex gap-6 justify-center items-center">
            <p className="flex gap-2">
              <span>
                <MapPin />
              </span>
              Location
            </p>
            <p className="flex gap-2">
              <span>
                <Users />
              </span>
              100000-500000
            </p>
            <p className="flex gap-2">
              <span>
                <Phone />
              </span>
              977 980000000
            </p>
            <p className="flex gap-2">
              <span>
                <Calendar />
              </span>
              since 2003
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Button className="p-4">Bookmark <span><Bookmark/></span></Button>
        </div>
      </div>
      {/* ends here  */}

      <div className="flex items-center justify-center gap-40">
        <div className="max-w-[788px] max-h-[458px] p-10 bg-white">
          <h1 className="text-2xl font-medium">Who we are ?</h1>
          <p className="text-wrap">
            We are the multinational company bascically reside in the hongkong
            which main focus is to improve software ,perosonal computers of the
            customers.Lorem Lenovo is determined to improve our planet and
            society by minimizing Lenovo’s environmental impact, promoting
            social equity through its business and via the Lenovo Foundation,
            and ensuring ethical, responsible, and transparent operations. In
            January 2023, Lenovo became one of the first group of companies to
            receive net-zero validation from the Science Based Targets
            initiative, making it the first PC and smartphone maker and one of
            only 139 companies around the world with targets validated by the
            Net-Zero Standard. Lenovo’s goal is to positively impact 15 million
            people by 2025 through the work of global philanthropy partnerships
            and programs, led by the Lenovo Foundation.
          </p>
        </div>
        <div className="min-w-[460px] max-h-[458px] bg-white border p-10">
            <h1 className="text-2xl font text-center mb-4">Comapany SnapShot</h1>
            <div className="flex flex-col gap-4">
            <div>
                <p className="flex gap-2 font-bold text-xl"> <span><Globe/></span>Industry</p>
                <p className="font-light text-gray-600">www.udemy.com</p>
            </div>
            <div>
                <p className="flex gap-2 font-bold text-xl"> <span><Building/></span>Website</p>
                <p className="font-light text-gray-600">Information Technology</p>
            </div>
            <div>
                <p className="flex gap-2 font-bold text-xl"> <span><BriefcaseBusiness/></span>Department</p>
                <p className="font-light text-gray-600">Marketing</p>
            </div>
            <div>
                <p className="flex gap-2 font-bold text-xl"> <span><MapPin/></span>Office</p>
                <p className="font-light text-gray-600">Ktm Baneshwor</p>
            </div>
            </div>
        </div>
      </div>

      {/* next section starts here  */}

      <div className="flex gap-40 items-center justify-center">
        <div className="bg-white rounded-2xl p-10 flex flex-col justify-center items-center gap-10">
            <h1 className="text-2xl font-bold ">Features</h1>
            <div className="grid grid-cols-2 gap-8">
            <div className=" p-4 min-w-[283px] bg-white border border-black rounded-2xl">
                <h1 className="text-xl ">Remote Friendly</h1>
                <p>remote friendly environment for work</p>
            </div>
            <div className=" p-4 min-w-[283px] bg-white border border-black rounded-2xl">
                <h1 className="text-xl ">Remote Friendly</h1>
                <p>remote friendly environment for work</p>
            </div>
            <div className=" p-4 min-w-[283px] bg-white border border-black rounded-2xl">
                <h1 className="text-xl ">Remote Friendly</h1>
                <p>remote friendly environment for work</p>
            </div>
            <div className=" p-4 min-w-[283px] bg-white border border-black rounded-2xl">
                <h1 className="text-xl">Remote Friendly</h1>
                <p>remote friendly environment for work</p>
            </div>

            </div>
        </div>
        <div className="p-10 bg-white flex flex-col gap-4 ">
            <h1 className="text-xl font-bold">Get in Touch</h1>

            <div className="flex flex-col gap-2">
                <label>Full Name</label>
                <input type="text" className="border border-black p-2 min-w-[347]" />
            </div>
            <div className="flex flex-col gap-2">
                <label>Work Email</label>
                <input type="text" className="border border-black p-2 min-w-[347]" />
            </div>
            <div className="flex flex-col gap-2">
                <label>Message</label>
                <textarea className="border border-black p-2 min-w-[347] h-auto"/>
            </div>
             <div className="flex justify-center items-center">
            <Button>Send</Button>
             </div>
        </div>
      </div>
      {/* ends here  */}
      <div className="flex gap-40 justify-center items-center">
        <div className="bg-white rounded-2xl p-10 flex flex-col gap-4 min-w-[746px]">
            <h1 className="text-2xl font-medium">Inside our company</h1>
            <p className="font-light text-sm text-gray-700">Take a peak of some of our favourite moments inside our company</p>
            <div className="grid grid-cols-3 gap-4">
                <img src="/Accounting.jpg" alt="images" className="object-contain min-w-[193px] max-h-[114px] rounded-2xl border border-black"/>
                <img src="/Accounting.jpg" alt="images" className="object-contain min-w-[193px] max-h-[114px] rounded-2xl border border-black"/>
                <img src="/Accounting.jpg" alt="images" className="object-contain min-w-[193px] max-h-[114px] rounded-2xl border border-black"/>
                <img src="/Accounting.jpg" alt="images" className="object-contain min-w-[193px] max-h-[114px] rounded-2xl border border-black"/>
                <img src="/Accounting.jpg" alt="images" className="object-contain min-w-[193px] max-h-[114px] rounded-2xl border border-black"/>
                <img src="/Accounting.jpg" alt="images" className="object-contain min-w-[193px] max-h-[114px] rounded-2xl border border-black"/>
            </div>
        </div>
        <div className="p-10 max-h-[500] min-w-[460px] bg-white rounded-2xl flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Company Location</h1>
            <img src="/Map.jpg" alt="" className="object-cover max-h-[330px] border border-black w-full" />
        </div>
      </div>
      {/* footer  */}
      <Footer/>
    </div>
  );
};

export default ViewCompany;

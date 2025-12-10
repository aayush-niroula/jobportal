import FilterSection from "@/app/_components/FilterSection";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CandidateCard from "./_component/CandidateCard";
import Footer from "@/app/_components/Footer";

const page = () => {
  return (
    <div className="flex flex-col gap-4">
    <div className="flex justify-center gap-40 bg-[#F1F5F9] items-center pt-20">
      <div className="flex flex-col gap-4">
        {/* Search companies start here  */}
        <div className="max-w-[372px] h-auto border border-black rounded-2xl bg-white p-6">
          <h1 className="text-xl font-bold text-center">Search companies</h1>
          <div className="flex flex-col gap-4 justify-center items-center">
            <input
              type="text"
              placeholder="Skills"
              className="p-2 border border-black w-full rounded-md "
            />
            <Select>
              <SelectTrigger className="w-full p-4 border border-black">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Location</SelectLabel>
                  <SelectItem value="Kathmandu">Kathmandu</SelectItem>
                  <SelectItem value="Biratnagar">Biratnagar</SelectItem>
                  <SelectItem value="Ithari">Ithari</SelectItem>
                  <SelectItem value="Pokhara">Pokhara</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <input
              type="text"
              placeholder="Industry"
              className="p-2 border border-black w-full "
            />
            <Button className="p-6">Search</Button>
          </div>
        </div>
        {/* end here  */}
        <div className="flex flex-col gap-4">
          <FilterSection
            options={[
              { label: "Entry Levle", count: 180 },
              { label: "Mid Level", count: 42 },
              { label: "Senior", count: 30 },
              { label: "Expert", count: 20 },
            ]}
            title="Experience level"
            showLocation={false}
          />
          <FilterSection
            options={[
              { label: "High School", count: 180 },
              { label: "Associate's", count: 42 },
              { label: "Bachelor", count: 30 },
              { label: "Master's", count: 20 },
              { label: "Phd's", count: 20 },
            ]}
            title="Education level"
            showLocation={false}
          />
          <FilterSection
            options={[
              { label: "JavaScript", count: 180 },
              { label: "Java", count: 42 },
              { label: "Python", count: 30 },
              { label: " C#", count: 20 },
            ]}
            title="Skills"
            showLocation={false}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
       <CandidateCard
       description="Experienced software developer with 5+ years of expertise in building scalable web applications and leading development teams. "
        education="Bachelor's Degree"
        image=""
        location="Toronto,Canada"
        name="Alex buffet"
        role="Full stack developer"
        skill1="Node js"
        skill2="Docker"
        skill3="React js"
       />
       <CandidateCard
       description="Experienced software developer with 5+ years of expertise in building scalable web applications and leading development teams. "
        education="Bachelor's Degree"
        image=""
        location="Toronto,Canada"
        name="Cristiano Ronaldo"
        role="Full stack developer"
        skill1="Node js"
        skill2="Docker"
        skill3="React js"
       />
       <CandidateCard
       description="Experienced software developer with 5+ years of expertise in building scalable web applications and leading development teams. "
        education="Bachelor's Degree"
        image=""
        location="Toronto,Canada"
        name="John Cena"
        role="Full stack developer"
        skill1="Node js"
        skill2="Docker"
        skill3="React js"
       />
       <CandidateCard
       description="Experienced software developer with 5+ years of expertise in building scalable web applications and leading development teams. "
        education="Bachelor's Degree"
        image=""
        location="Toronto,Canada"
        name="Elon Musk"
        role="Full stack developer"
        skill1="Node js"
        skill2="Docker"
        skill3="React js"
       />

       <div className="flex justify-center items-center mt-4">
        <Button>View More</Button>
       </div>
      

      </div>
    </div>
     <Footer/>
    </div>
  );
};

export default page;

import CategoryBox from "../_components/CategoryBox";
import ChooseUsBox from "../_components/ChooseUsBox";
import FeaturedJob from "../_components/FeaturedJob";
import Footer from "../_components/Footer";
import GetStarted from "../_components/GetStarted";
import Searchbar from "../_components/Searchbar";

export default function Home() {
  return (
    <div className="pt-10 flex flex-col items-center gap-8 bg-[#F1F5F9] w-full font-playfair">
        <h1 className="text-center lg:text-5xl font-medium font-playfair text-xl ">FIND YOUR DREAM JOB TODAY</h1>
        <p className="text-center font-light leading-relaxed ">Discover opportunities that match your skills. Apply easily, connect with employers, and take the next step in your career—all in one platform</p>
        <Searchbar/>
        <p className="font-medium ">Popular Searches: <span className="font-light text-sm">Designer</span> <span className="font-light text-sm">Web Developer</span></p>

        <h1 className="text-4xl font-playfair">Categories</h1>
        <div className="grid grid-cols-1 p-4 gap-10 lg:grid-cols-3 md:grid-cols-2 ">
        <CategoryBox
          categoryname="Developer"
          jobsno={12}
        />
        <CategoryBox 
        categoryname="Medicine"
        jobsno={10}
        />
        
        <CategoryBox
        categoryname="Hardware"
        jobsno={5}
        />
        </div>

        <h1 className="text-4xl font-medium pt-8 font-playfair">Featured Jobs</h1>
        <div className="grid gap-6">
        <FeaturedJob/>
        <FeaturedJob/>
        <FeaturedJob/>

        </div>

        <h1 className="text-4xl font-bold pt-4 font-playfair">Why choose us ?</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 lg:max-auto gap-6">
          <ChooseUsBox/>
          <ChooseUsBox/>
          <ChooseUsBox/>
        </div>

        <GetStarted/>

        {/* footer section */}
        <Footer/>





    </div>
  );
}

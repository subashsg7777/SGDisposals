import React from "react";
import { Leaf, Recycle, Globe, Droplet } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-10">
      <div className="max-w-7xl w-full flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden">
        
        {/* Left Section - Illustration */}
        <div className="md:w-1/2 bg-green-600 flex flex-col items-center justify-center p-10 space-y-10 text-white">
          <div className="flex flex-col items-center space-y-3">
            <Leaf className="w-14 h-14" />
            <p className="text-lg">Eco-conscious Solutions</p>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <Recycle className="w-14 h-14" />
            <p className="text-lg">Responsible Disposal</p>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <Globe className="w-14 h-14" />
            <p className="text-lg">Global Impact</p>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <Droplet className="w-14 h-14" />
            <p className="text-lg">Protecting Water Bodies</p>
          </div>
        </div>

        {/* Right Section - Content */}
        <div className="md:w-1/2 p-12 space-y-6 text-gray-700">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>
          
          <p>
            At <strong>SG Disposals</strong>, we believe waste management is more than a necessity—it’s a responsibility. Our mission is to create sustainable solutions that protect our environment and promote a cleaner, healthier future.
          </p>

          <p>
            Founded with a vision to tackle the growing challenges of waste disposal, SG Disposals has evolved into a trusted partner for communities and businesses alike. We combine modern technology with eco-conscious practices to minimize harm to the planet.
          </p>

          <p>
            Our team is passionate about making a difference. From reducing landfill contributions to innovating recycling methods, we constantly explore new ways to transform waste into opportunity.
          </p>

          <p>
            Protecting water bodies from pollution is one of our core focuses. By raising awareness and implementing effective strategies, we safeguard rivers, lakes, and oceans from harmful contaminants.
          </p>

          <p>
            We also believe in community engagement. Through education, outreach, and collaboration, SG Disposals empowers individuals and organizations to take part in building a greener tomorrow.
          </p>

          <p>
            Looking ahead, we are committed to expanding our reach and innovating further. With every initiative, we strive to reinforce our promise: to dispose responsibly, recycle effectively, and protect the Earth we all call home.
          </p>
        </div>
      </div>
    </div>
        <Footer/>
    </>
  );
};

export default AboutUs;

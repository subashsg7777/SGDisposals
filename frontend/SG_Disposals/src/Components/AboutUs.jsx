import React from "react";
import { Leaf, Recycle, Globe, Droplet } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 md:p-10">
        <div className="max-w-7xl w-full flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden">
          
          {/* Left Section - Illustration */}
          <div className="md:w-1/2 bg-green-600 md:bg-green-600 bg-gradient-to-r from-green-500 to-green-700 animate-scroll md:animate-none flex flex-col items-center justify-center p-6 md:p-10 text-white">
            
            {/* Mobile: Horizontal swipe carousel */}
            <div className="flex md:flex-col space-x-4 md:space-x-0 overflow-x-auto snap-x snap-mandatory md:overflow-visible w-full md:w-auto">
              <div className="flex-shrink-0 snap-center flex flex-col items-center space-y-2  rounded-xl p-6 min-w-[180px] hover:scale-105 transition-transform">
                <Leaf className="w-10 h-10" />
                <p className="text-sm md:text-lg">Eco-conscious Solutions</p>
              </div>
              <div className="flex-shrink-0 snap-center flex flex-col items-center space-y-2 rounded-xl p-6 min-w-[180px] hover:scale-105 transition-transform">
                <Recycle className="w-10 h-10" />
                <p className="text-sm md:text-lg">Responsible Disposal</p>
              </div>
              <div className="flex-shrink-0 snap-center flex flex-col items-center space-y-2 rounded-xl p-6 min-w-[180px] hover:scale-105 transition-transform">
                <Globe className="w-10 h-10" />
                <p className="text-sm md:text-lg">Global Impact</p>
              </div>
              <div className="flex-shrink-0 snap-center flex flex-col items-center space-y-2 rounded-xl p-6 min-w-[180px] hover:scale-105 transition-transform">
                <Droplet className="w-10 h-10" />
                <p className="text-sm md:text-lg">Protecting Water Bodies</p>
              </div>
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="md:w-1/2 p-6 md:p-12 space-y-6 text-gray-700">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">About Us</h1>
            
            {/* Mobile: Accordions, Desktop: Full text */}
            <div className="block md:hidden space-y-4">
              <details className="bg-gray-100 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">Our Mission</summary>
                <p className="mt-2 text-gray-600">
                  At <strong>SG Disposals</strong>, we believe waste management is more than a necessity—it’s a responsibility...
                </p>
              </details>
              <details className="bg-gray-100 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">Community Engagement</summary>
                <p className="mt-2 text-gray-600">
                  Through education, outreach, and collaboration, SG Disposals empowers individuals and organizations...
                </p>
              </details>
              <details className="bg-gray-100 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">Future Vision</summary>
                <p className="mt-2 text-gray-600">
                  Looking ahead, we are committed to expanding our reach and innovating further...
                </p>
              </details>
            </div>

            {/* Desktop/Tablet: Full paragraphs */}
            <div className="hidden md:block space-y-6">
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
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;

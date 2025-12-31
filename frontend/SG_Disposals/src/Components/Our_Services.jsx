import React, { useState, useEffect } from "react";
import car1 from "../assets/car-1.png";
import car2 from "../assets/car-2.png";
import car3 from "../assets/car-3.png";

const ImageCarousel = () => {
  const images = [car1, car2, car3];
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  // Autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade out
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(true); // fade in new image
      }, 300); // duration of fade out
    }, 3000); // change every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[80%] "> {/* ✅ fixed height */}
      <img
        src={images[current]}
        alt={`Slide ${current}`}
        className={`w-full h-full object-cover rounded-lg transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Indicators */}
      <div className="flex justify-center mt-2 space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-green-600" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

const Our_Services = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 p-6 h-fit items-center"> {/* ✅ items-start */}
      {/* Left: Carousel */}
      <ImageCarousel />

      {/* Right: Text Content */}
      <div className="pr-7 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-4 text-black text-center">Our Services</h2>
        <p className="text-black text-[18px] mb-4">
          SG Disposals focuses on making waste collection simple, structured, and accountable.
          Users can raise collection requests based on their needs, track the status of those
          requests, and see them move through a clear lifecycle instead of disappearing into a
          black hole. The goal is to replace unorganized disposal with a system that is predictable,
          transparent, and easy to use.
        </p>
        <p className="text-black text-[18px]">
          Beyond collection, the platform encourages responsible disposal through a points-based
          system. Users earn points for completed collections and can redeem them for useful
          products, turning waste management into something that actually gives value back. SG
          Disposals is still evolving, but the foundation is built around solving a real problem
          with a practical, system-driven approach — not just good intentions.
        </p>
      </div>
    </div>
  );
};

export default Our_Services;

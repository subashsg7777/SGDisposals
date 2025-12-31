import React, { useState, useEffect } from "react";
import car4 from "../assets/car-4.png";
import car5 from "../assets/car-5.png";
import car6 from "../assets/car-6.png";

const ImageCarousel = () => {
  const images = [car4, car5, car6];
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full" style={{height:"700px"}}> {/* ✅ fixed height */}
      <img
  src={images[current]}
  alt={`Slide ${current}`}
  className={`w-full h-full object-contain rounded-lg transition-opacity duration-500 ${
    fade ? "opacity-100" : "opacity-0"
  }`}
/>

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

const Earth = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-8 items-center"> {/* ✅ vertical center */}
      {/* Left: Text Content */}
      <div className="p-4 flex flex-col justify-center items-center text-center"> {/* ✅ left-align */}
        <h2 className="text-4xl font-bold italic mb-4 text-black">2Billion+ Waste Are Generated Over a Year </h2>
        <p className="text-black mb-4">
          Improper waste disposal is one of the fastest-growing threats to the environment. Globally, over 2 billion tonnes of waste are generated every year, 
          and nearly one-third of it is mismanaged — dumped, burned, or left untreated. This directly contaminates soil, water sources, and air, affecting both 
          ecosystems and human health.
        </p>
        <p className="text-black">
          Plastic and organic waste are especially damaging. Plastics can take hundreds of years to decompose, breaking down into microplastics that enter food chains.
          Unmanaged organic waste releases methane, a greenhouse gas far more harmful than CO₂. 
          Without structured collection and accountability, waste doesn’t disappear — it accumulates, spreads, and silently damages the planet we depend on.
        </p>
      </div>

      {/* Right: Carousel */}
      <ImageCarousel />
    </div>
  );
};

export default Earth;

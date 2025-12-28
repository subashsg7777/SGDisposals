import React from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import FeaturedProducts from './FeaturedProducts'

const Home = ( ) => {
  return (
    <div className="min-h-screen  bg-white">
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
    </div>
  )
}

export default Home

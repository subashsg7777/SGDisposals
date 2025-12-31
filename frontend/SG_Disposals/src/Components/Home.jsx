import React,{useRef, useState} from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import FeaturedProducts from './FeaturedProducts'
import Our_Services from './Our_Services'
import Earth from './Earth'
import Footer from './Footer'

const Home = ( ) => {
    const [showModal,setShowModal] = useState(false);
    const serviceRef = useRef();

  return (
    <div className="min-h-screen  bg-white">
      <Navbar setShowModal={setShowModal} serviceRef={serviceRef}/>
      <HeroSection showModal={showModal} setShowModal={setShowModal}/>
      <FeaturedProducts />
      <section ref={serviceRef}>
      <Our_Services />
      </section>
      <Earth />
      <Footer />
    </div>
  )
}

export default Home
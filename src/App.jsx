import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Highlights from './components/Highlights';
import Model3 from './components/Model3';
import Features from './components/Features';
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import * as Sentry from "@sentry/react";
import Howitworks from './components/Howitworks';
import Footer from './components/Footer';
gsap.registerPlugin(ScrollToPlugin);

function App() {
  // const videoSectionRef = useRef(null);

  // const scrollToVideo = () => {
  //   videoSectionRef.current.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'center',
  //   });
  // };
    const videoSectionRef = useRef(null);
    const scrollToVideo = () => {
        gsap.to(window, {
        duration: 2,  
        scrollTo: {
            y: videoSectionRef.current,  
            offsetY: 115,  
        },
        ease: 'power2.inOut',
        });
    };

  return (
    <div>
      <main className='bg-black'>
        <Navbar/>
        <Hero scrollToVideo={scrollToVideo}/>
        <Highlights videoSectionRef={videoSectionRef}/>
        <Model3/>
        <Features/>
        <Howitworks/>
        <Footer/>
      </main>
    </div>
  )
}

export default Sentry.withProfiler(App)

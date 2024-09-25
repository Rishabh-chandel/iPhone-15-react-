import React, { useEffect } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo,smallHeroVideo } from "../utils";
import { useState } from "react";


const Hero = ({scrollToVideo}) => {
    const[videosrc,setvideosrc] = useState(
        window.innerWidth < 760 ? smallHeroVideo : heroVideo
    );

    const handelvideosrc = () => {
        if(window.innerWidth < 760) {
            setvideosrc(smallHeroVideo);
        }
        else {
            setvideosrc(heroVideo);
        }
    }

    useEffect(() => {
        window.addEventListener('resize',handelvideosrc);
        return() => {
            window.removeEventListener('resize',handelvideosrc);
        }
    },[])
 
    useGSAP(()=> {
        gsap.to('#hero' , {
            opacity: 1,
            delay: 1.5,
        })
        gsap.to('#cta' , {
            opacity: 1,
            y: -50,
            delay: 2,
            duration: 1
        })
    },[]);

    return(
        <section className="w-full mt-5 nav-height bg-black relative">
            <div className="h-5/6 w-full flex flex-center flex-col" >
                <p id="hero" className="hero-title -translate-y-10 ">iPhone 15 pro</p>
                <div className="md:w-10/12 w-9/12">
                    <video className=" pointer-events-none " autoPlay muted playsInline={true} key={videosrc}>
                        <source src={videosrc} type="video/mp4"></source>
                    </video>
                </div>
            </div>
            <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
                <button className="btn" onClick={scrollToVideo}>
                    Buy
                </button>
                <p className="font-normal text-xl">From $199/month or $999</p>
            </div>
        </section>
    );
}

export default Hero;
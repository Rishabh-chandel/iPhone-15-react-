import React, { useRef } from 'react'
import { chipImg, frameImg, frameVideo } from '../utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from '../utils/animations';
gsap.registerPlugin(ScrollTrigger);

const Howitworks = () => {
    const videoRef = useRef();

    useGSAP(() => {
        gsap.from('#chip',{
            scrollTrigger: {
                trigger: "#chip",
                start: "20% bottom"
            },
            opacity: 0,  
            scale: 2,
            duration: 2,
            ease: "power2.inOut",
        })
        animate('.g_fadeIn',{
            opacity:1,
            y:0,
            duration:1,
            ease:"power2.inOut",
        })
    },[]);

    return ( 
        <div className='common-padding'>
            <div className='screen-max-width'>
                <div id='chip' className='flex-center w-full my-20'>
                    <img src={chipImg} width={180} height={180}/>
                </div>
                <div className='flex flex-col items-center'>
                    <h2 className='hiw-title'>
                        A17 Pro chip.
                        <br/> A monster win for gaming.
                    </h2>
                    <p className='hiw-subtitle'>
                        It's here. The biggest redesign in the history of Apple GPUs.
                    </p>
                </div>
                <div className='mt-10 md:mt-20 mb-14'>
                    <div className='relative h-full flex-center'>
                        <div className='overflow-hidden'>
                            <img src={frameImg} className=' relative z-10'/>
                        </div>
                        <div className='hiw-video'>
                            <video className='pointer-events-none' ref={videoRef} playsInline autoPlay preload='none' muted>
                                <source src={frameVideo} type='video/mp4'/>
                            </video>
                        </div>
                    </div>
                    <p className='text-gray font-semibold text-center mt-3'>Honkai: Star Rail</p>
                    <div className="hiw-text-container mt-10">
                            <div className="flex-1 flex-center flex-col">
                                <p className="hiw-text g_fadeIn">
                                    iPhone 15 Pro is {' '} 
                                    <span className="text-white">
                                     the first iPhone to feature an aerospace-grade titanium design
                                    </span>,
                                    using the same alloy that spacecrafts use for missions to Mars.
                                </p>
                                <br></br>
                                <br></br>
                                <p className="hiw-text g_fadeIn">
                                    Titanium has one of the best strength-to-weight ratios of any metal, making these our {' '}
                                    <span className="text-white">
                                    lightest Pro models ever.
                                    </span>
                                    You'll notice the difference the moment you pick one up.
                                </p>
                            </div>
                            
                            <div className='flex-1 flex justify-center flex-col g_fadeIn'>
                                <p className='hiw-text'>New</p>
                                <p className='hiw-bigtext'>Pro-class GPU</p>
                                <p className='hiw-text'>with 6 cores</p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Howitworks;

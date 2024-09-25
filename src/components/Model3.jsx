import { useGSAP } from '@gsap/react'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap';
import { yellowImg } from '../utils';
import * as THREE from 'three';
import Modelview from './Modelview';
import { animate } from '../utils/animations';
import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';
import {models, sizes} from "../constants";
import { animateWithGsapTimeline } from "../utils/animations";

function Model3() {
    const[size,setsize] = useState('small');
    const[model,setmodel] = useState({
        title: "iPhone 15 Titanium",
        color: ['#8F8A81' , '#FFF7B9' , '#6F6C64'],
        img: yellowImg,
    });
    //for camera
    const cameraSmall = useRef();
    const cameraLarge = useRef();
    // for model control
    const small = useRef(new THREE.Group());
    const large = useRef(new THREE.Group());
    // for tracking rotation
    const[smallrotation , setsmallrotation] = useState(0);
    const[largerotation , setlargerotation] = useState(0);

    const tmline = gsap.timeline();

    useEffect(() => {
        if(size == 'large') {
            animateWithGsapTimeline(tmline,small,smallrotation,'#view1','#view2',{
                transform: 'translateX(-100%)',
                duration: 2
            })
        }

        if(size == 'small') {
            animateWithGsapTimeline(tmline,large,largerotation,'#view2','#view1',{
                transform: 'translateX(0)',
                duration: 2
            })
        }

    },[size])

    useGSAP(() => {
        animate('#heading' , {y:0,
            opacity:1,
            duration:1.5})
    })

    return (
        <section className='common-padding'>
            <div className='screen-max-width'>
                <h1 id='heading' className='section-heading'>
                    Take a closer look.
                </h1>
                <div className=' flex flex-col items-center mt-5 relative'>
                    <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
                        <Modelview index = {1} groupRef={small} gsapType='view1' controlRef = {cameraSmall} 
                            setRotationState = {setsmallrotation} item = {model} size={size} />
                        <Modelview index = {2} groupRef={large} gsapType='view2' controlRef = {cameraLarge} 
                            setRotationState = {setlargerotation} item = {model} size={size} />
                        <Canvas className='w-full h-full' style={{position:'fixed',top:0,right:0,bottom:0,left:0,overflow:'hidden'}}
                            eventSource={document.getElementById('root')}>
                            <View.Port/>
                        </Canvas>
                    </div>
                    <div className='w-full mx-auto'>
                        <p className='text-sm font-light text-center mb-5'>{model.title}</p>
                        <div className='flex-center'>
                            <ul className='color-container'>
                                {
                                    models.map((item,i) => {
                                        return(<li key={i} className='w-6 h-6 rounded-full mx-2 cursor-pointer'
                                            style={{backgroundColor:item.color[0]}}
                                            onClick={()=> setmodel(item)}></li>);
                                    })
                                }
                            </ul>
                            <button className='size-btn-container'>
                                {
                                    sizes.map(({label,value}) => (
                                        <span key={label} className='size-btn' 
                                        style={{backgroundColor: size === value ? 'white':'transparent',
                                                color:size === value? 'black':'white'}}
                                        onClick={() => setsize(value)}>
                                            {label}
                                        </span>
                                    ))
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Model3
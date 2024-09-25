import React, { useEffect, useRef, useState } from 'react';
import {hightlightsSlides} from "../constants";
import gsap from 'gsap';
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const Videocomp = ({ videoSectionRef }) => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video , setvideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    });

    const[loadedData , setLoadedData] = useState([]);
    const {isEnd , startPlay , isLastVideo , videoId , isPlaying} = video;

    useGSAP(()=> {
        
      gsap.to("#slider", {
          transform: `translateX(${-100*videoId}%)`,
          duration: 2,
          ease: 'power2.inOut'
      });

      gsap.to("#video" , {
          scrollTrigger: {
              trigger: "#video",
              toggleActions: "restart none none none",
          },
          onComplete: () => {
              setvideo((pre) => ({
                  ...pre,
                  startPlay: true,
                  isPlaying: true,
              }));
          },
      });
    },[isEnd,videoId]);

    useEffect( () => {
      let currentProgress = 0;
      let span = videoSpanRef.current;
      if(span[videoId]) {
          let anim = gsap.to(span[videoId] , {
              onUpdate: () => {
                  const progress = Math.ceil(anim.progress()*100);
                  if(progress != currentProgress) {
                      currentProgress = progress;
                      gsap.to(videoDivRef.current[videoId], {
                          width: 
                              window.innerWidth < 760 ?
                               "10vw" : window.innerWidth < 1200 
                               ? "10vw" 
                               : "4vw",
                      });
                      gsap.to(span[videoId], {
                          width: `${currentProgress}%`,
                          backgroundColor: "white",
                      });
                  }
              },
              onComplete: () => {
                  if(isPlaying) {
                      gsap.to(videoDivRef.current[videoId], {
                          width: "12px",
                      })
                      gsap.to(span[videoId], {
                          backgroundColor: "#afafaf",
                      });
                  }
              },
          });
            if(videoId == 0) {
                anim.restart();
            }
            const animUpdate = () => {
                anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration);
            };
            if(isPlaying) {
                gsap.ticker.add(animUpdate);
            }
            else {
                gsap.ticker.remove(animUpdate);
            }
        }
    }, [videoId , startPlay]);

    useEffect( () => {
      if(loadedData.length > 3) {
          if(!isPlaying) {
              videoRef.current[videoId].pause();
          } 
          else {
             startPlay &&  videoRef.current[videoId].play();
          }
      }
    },[startPlay, videoId, isPlaying, loadedData]);

    const handleprocess = (type,i) => {
        switch(type) {
            case "video-end": 
                setvideo( (pre) => ({...pre,isEnd: true , videoId: i+1}));
                break;
            case "video-last":
                setvideo((pre) => ({...pre , isLastVideo: true}));
                break;
            case "video-reset":
                setvideo((pre) => ({...pre , isLastVideo: false , videoId: 0}))
                break;
            case "play":
                setvideo((pre) => ({...pre , isPlaying: !pre.isPlaying }))
                break;
            case "pause":
                setvideo((pre) => ({...pre , isPlaying: !pre.isPlaying }))
                break;
            default:
                return video;
        }
    };

    const handleLoadedMetaData = (i,e) => setLoadedData((pre) => [...pre,e]);

    return (
        <>
            <div className='flex items-center' ref={videoSectionRef}>
                {hightlightsSlides.map((list,i) => (
                        <div key={list.id} id="slider" className='sm:pr-20 pr-10'>
                            <div className='video-carousel_container'>
                                <div className='w-full h-full flex-center overflow-hidden rounded-3xl bg-black'>
                                    <video id="video" playsInline={true} preload='auto' muted ref={(el) => (videoRef.current[i] = el)} 
                                        onPlay = {() => 
                                            setvideo((pre) => ({
                                                ...pre,isPlaying: true
                                            }))
                                        } onLoadedMetadata = {(e) => handleLoadedMetaData(i,e)}
                                        onEnded={() => 
                                            i !== 3 ? handleprocess("video-end",i) : handleprocess("video-last")
                                        } className={`${list.id === 2 && 'translate-x-44'} pointer-events-none`}>
                                       <source src={list.video} type='video/mp4'/>
                                    </video>
                                </div>
                                <div className='absolute top-12 left-[5%] z-10'>
                                    {list.textLists.map((text,i) => (
                                        <p key={i} className='md:text-2xl text-xl font-medium'>
                                            {text}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    
                ) )}
            </div>
            <div className="relative flex-center mt-10">
                <div className="flex-center py-5 px-7 bg-gray-300 backdrop:blur rounded-full">
                    {videoRef.current.map( (_, i) => (
                            <span key={i} ref={(el) => (videoDivRef.current[i] = el)} 
                                className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer">
                                   <span className="absolute h-full w-full rounded-full" 
                                   ref={(el) => (videoSpanRef.current[i] = el)} /> 
                            </span>
                    ))}
                </div>
                <button className='control-btn'>
                    <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} 
                        alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'} 
                        onClick={isLastVideo ? () => handleprocess('video-reset') : 
                            !isPlaying ? () => handleprocess("play") : () => handleprocess("pause")}/>
                </button>
            </div>
        </>
    );
}

export default Videocomp;
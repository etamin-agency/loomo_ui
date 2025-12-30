import React, { useEffect, useState, useRef } from 'react'
import "./Main.css"

import video1 from "../../assets/videos/video1.mp4"
import video2 from "../../assets/videos/video2.mp4"
import video3 from "../../assets/videos/video3.mp4"
import video4 from "../../assets/videos/video4.mp4"

const videos = [video1, video2, video3, video4]

const Main = () => {
  const [showPagination, setShowPagination] = useState(false);
  const mainRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY

      const mainTop = mainRef.current.offsetTop;
      const mainHeight = mainRef.current.offsetHeight;
      const mainBottom = mainTop + mainHeight - window.innerHeight;

      setShowPagination(scrollTop >= mainTop && scrollTop <= mainBottom);

      const scrollProgress = (scrollTop - mainTop) / (mainHeight - window.innerHeight);
      const index = Math.min(
        Math.max(Math.floor(scrollProgress * videos.length), 0),
        videos.length - 1
      );

      setActiveVideo(index)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="Main" ref={mainRef}>
      {videos.map((video, index) => (
        <video
          key={index}
          className={`bg-video ${activeVideo === index ? "active" : ""}`}
          src={video}
          autoPlay
          muted
          loop
          playsInline
        />
      ))}

      
      <div className="overlay"></div>

     
      {showPagination &&
        <div className="pagination">
          {videos.map((_, index) => (
            <span
              key={index}
              className={`dot ${activeVideo === index ? "active" : ""}`}
            />
          ))}
        </div>
      }

      <div className="content">
        <h1>Hello world</h1>
        <h1>Hello world</h1>
        <h1>Hello world</h1>
        <h1>Hello world</h1>
        <h1>Hello world</h1>
        <h1>Hello world</h1>
        <h1>Hello world</h1>
        <h1>Hello world</h1>
      </div>
    </div>
  )
}

export default Main

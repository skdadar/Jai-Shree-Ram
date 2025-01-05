'use client'

import { useState, useRef } from 'react'

export default function AutoWebsiteReveal() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const websiteUrl = 'https://shrirammandir.co.in/'

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsFadingOut(true) // Start fade-out effect
      setTimeout(() => {
        setIsPlaying(true)
      }, 500) // Allow the fade-out to complete before hiding the button
    }
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
    setVideoEnded(true)
    openWebsite()
  }

  const openWebsite = () => {
    const newWindow = window.open(websiteUrl, '_blank')
    if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
      window.location.href = websiteUrl
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="relative w-full h-screen aspect-video bg-black overflow-hidden shadow-xl">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/videos/launch.mp4"
          onEnded={handleVideoEnd}
        />
        {!isPlaying && !videoEnded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-56 ">
            <div
              onClick={handlePlay}
              className={`relative w-64 h-64 flex items-center justify-center cursor-pointer select-none
                transition-opacity duration-500 ease-in-out transform hover:scale-105 animate-pulse opacity-80 ${
                  isFadingOut ? 'opacity-0' : ''
                }`}
              style={{
                transition: 'opacity 0.5s ease-in-out',
              }}
            >
              <img
                src="/om.gif"
                alt="Launch"
                className="w-40 h-40 object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

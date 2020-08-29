import React, {useEffect, useRef} from 'react'

function addVideoStream(video: HTMLVideoElement, stream: MediaStream, muted: boolean) {
  if(muted) video.muted = true

  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => video.play())
}

export default function VideoComponent(
  {userId, stream, muted} : {userId: string | null, stream: MediaStream | null, muted: boolean}
) {
  const videoElRef =  useRef<HTMLVideoElement>(null)

  useEffect(()=> {
    if(!stream) return
    if(!videoElRef || !videoElRef.current) return
    const video = videoElRef.current
    addVideoStream(video, stream, muted)
    console.log('Readding video for', userId)

    return () => {
      video.pause()
      video.removeAttribute('src')
      video.load()
    }
  }, [])

  return (
    <video style={{
      maxHeight: '100%',
      maxWidth: '100%'
    }} id={`${userId}`} ref={videoElRef}/>
  )
}

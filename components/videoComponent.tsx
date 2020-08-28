import React, {useEffect, useRef} from 'react'

function addVideoStream(video: HTMLVideoElement, stream: MediaStream, muted: boolean = true) {
  if(muted) video.muted = true

  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => video.play())
}

export default function VideoComponent(
  {userId, stream} : {userId: string | null, stream: MediaStream | null}
) {
  const videoElRef =  useRef<HTMLVideoElement>(null)
  console.log('render video ', userId)

  useEffect(()=> {
    if(!stream) return
    if(!videoElRef || !videoElRef.current) return
    const video = videoElRef.current
    addVideoStream(video, stream)
    return () => {
      console.log('MY VIDOE', video)
      video.pause()
      video.removeAttribute('src')
      video.load()
    }
  }, [])

  return (
    <div>
      <div>Room {userId}</div>
      <video id={`${userId}`} ref={videoElRef}/>
    </div>
  )
}

import React, {useEffect, useRef} from 'react'

type videoComponentProps = {
  userId: string | null
  stream: MediaStream | null
  muted?: boolean
}

function addVideoStream(video: HTMLVideoElement, stream: MediaStream, muted: boolean) {
  if(muted) video.muted = true

  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => video.play())
}

export default function VideoComponent(
  { userId, stream, muted = false}: videoComponentProps
) {
  const videoElRef =  useRef<HTMLVideoElement>(null)

  useEffect(()=> {
    if(!stream) return
    if(!videoElRef || !videoElRef.current) return
    const video = videoElRef.current
    addVideoStream(video, stream, muted)

    return () => {
      video.pause()
      video.removeAttribute('src')
      video.load()
    }
  }, [])

  return (
    <video style={{
      minHeight: '100%',
      minWidth: '100%'
    }} id={`${userId}`} ref={videoElRef}/>
  )
}

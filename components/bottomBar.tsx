import React, {CSSProperties, useState, useEffect} from 'react'
import Mic from '../assests/svg/mic.svg'
import MicMute from '../assests/svg/micMute.svg'
import Cam from '../assests/svg/cam.svg'
import CamOff from '../assests/svg/camOff.svg'
import RoundButton from "./roundButton";

const getMediaTrack =(track: 'video' | 'audio', stream: MediaStream) => {
  const tracks = {
    'video': stream.getVideoTracks()[0],
    'audio': stream.getAudioTracks()[0]
  }
 return tracks[track]
}


export default function BottomBar({stream}:{stream: MediaStream}) {
  const [isVideoPlaying, setIsVideoPlaying] = useState<Boolean>(true)
  const [isAudioPlaying, setIsAudioPlaying] = useState<Boolean>(true)

  const toggle = (track: 'video' | 'audio', stream: MediaStream) => {
    const mediaTrack = getMediaTrack(track, stream)
    mediaTrack.enabled = !mediaTrack.enabled

    if(track === 'video') setIsVideoPlaying(mediaTrack.enabled)
    if(track === 'audio') setIsAudioPlaying(mediaTrack.enabled)
  }

  useEffect(()=>{
    if(!stream) return

    setIsVideoPlaying(getMediaTrack('video', stream).enabled)
    setIsAudioPlaying(getMediaTrack('audio', stream).enabled)
  },[stream])

  return (
    <div style={{...BottomBarStyles}}>
      <RoundButton
        danger={!isVideoPlaying}
        onClick={()=> toggle('video', stream)}
      >
        {isVideoPlaying ? <Cam/> : <CamOff/>}
      </RoundButton>
      <RoundButton
        danger={!isAudioPlaying}
        onClick={()=> toggle('audio', stream)}
      >
        {isAudioPlaying ? <Mic/> : <MicMute/>}
      </RoundButton>
    </div>
  )
}

const BottomBarStyles:CSSProperties = {
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  left: '0',
  bottom: '0',
  height: '80px',
  width: '100%',
  backgroundColor: '#f8f8f2',
}
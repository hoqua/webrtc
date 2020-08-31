import React, {CSSProperties, useState, useEffect} from 'react'
import Mic from '../assests/svg/mic.svg'
import MicMute from '../assests/svg/micMute.svg'
import Cam from '../assests/svg/cam.svg'
import CamOff from '../assests/svg/camOff.svg'
import ButtonRound from './buttonRound'

const VIDEO = 'video'
const AUDIO = 'audio'

type MediaTrack = typeof VIDEO | typeof AUDIO

type BarBottomProps = {stream: MediaStream}

const getMediaTrack =(track: MediaTrack, stream: MediaStream) => {
  const tracks = {
    [VIDEO]: stream.getVideoTracks()[0],
    [AUDIO]: stream.getAudioTracks()[0]
  }
 return tracks[track]
}

export default function BarBottom({ stream }: BarBottomProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true)
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(true)

  const toggle = (track: MediaTrack, stream: MediaStream) => {
    const mediaTrack = getMediaTrack(track, stream)
    mediaTrack.enabled = !mediaTrack.enabled

    if(track === VIDEO) setIsVideoPlaying(mediaTrack.enabled)
    if(track === AUDIO) setIsAudioPlaying(mediaTrack.enabled)
  }

  useEffect(()=>{
    if(!stream) return

    setIsVideoPlaying(getMediaTrack(VIDEO, stream).enabled)
    setIsAudioPlaying(getMediaTrack(AUDIO, stream).enabled)
  },[stream])

  return (
    <div style={{...BottomBarStyles}}>
      <ButtonRound
        danger={!isVideoPlaying}
        onClick={()=> toggle(VIDEO, stream)}
      >
        {isVideoPlaying ? <Cam/> : <CamOff/>}
      </ButtonRound>

      <ButtonRound
        danger={!isAudioPlaying}
        onClick={()=> toggle(AUDIO, stream)}
      >
        {isAudioPlaying ? <Mic/> : <MicMute/>}
      </ButtonRound>
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
  height: '70px',
  width: '100%',
  backgroundColor: '#f8f8f2',
}

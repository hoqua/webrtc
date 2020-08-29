import React, {CSSProperties} from 'react'
import Mic from '../assests/svg/mic.svg'
//import MicMute from '../assests/svg/micMute.svg'
import Cam from '../assests/svg/cam.svg'
//import CamOff from '../assests/svg/camOff.svg'
import RoundButton from "./roundButton";

export default function BottomBar() {
  return (
    <div style={{...BottomBarStyles}}>
      <RoundButton> <Cam/></RoundButton>
      <RoundButton><Mic/></RoundButton>
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
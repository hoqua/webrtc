import React, {CSSProperties} from 'react'
import { useRouter } from 'next/router'
import { getRoomId } from '../utils/api'
import ButtonBase from '../components/buttonBase'

export default function Home (){
  const Router = useRouter()

  const createRoom = async () => {

    const { roomId } = await getRoomId()
    await Router.push(`/room?roomId=${roomId}`, `/${roomId}`, {shallow: true})
  }

  return (
    <div style={GridStyles}>
      <div style={CardContainerStyles} className="add-padding">
        <div >
          <h1>Web Real-Time Communication</h1>
          <p className="pb2">WebRTC is a free, open-source project that provides web browsers and mobile applications with real-time communication (RTC) via simple application programming interfaces (APIs).</p>

          <ButtonBase onClick={() => createRoom()}>
            Create room
          </ButtonBase>
          <ButtonBase onClick={() => createRoom()} flat>
            Join room
          </ButtonBase>

          <hr className="mt2 mb2"/>
        </div>
      </div>
      <div className="add-padding">
        <img src="/assets/img/hero.jpeg" alt="hero banner"/>
      </div>
    </div>
  )
}

const GridStyles:CSSProperties = {
  display: 'grid',
  gridTemplateColumns: `repeat(2, minmax(250px, 1fr))`,
  gridAutoRows: `minmax(min-content, max-content)`
}

const CardContainerStyles:CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  maxWidth: '700px'
}

import React, {useEffect, useState, useCallback, CSSProperties} from 'react'
import io from 'socket.io-client'
import { RoomId } from '../utils/api'
import VideoComponent from "../components/videoComponent";
import BarBottom from "../components/barBottom";

Room.getInitialProps = async ( { query }: { query: RoomId} ) => {
  return { roomId: query.roomId }
}

interface IStreamMap {
  userId: string
  stream: MediaStream
}

let MY_ID: any
let MY_STREAM: MediaStream

export default function Room( {roomId}: RoomId) {
  const [streamsMap, setStreamsMap] = useState<IStreamMap | null>(null)

  const updateStreamsMap = (userId: string, stream: MediaStream) => {
    setStreamsMap((streamsOld:any) => ({...streamsOld, [userId]: stream }))
  }

  const deleteFromStreamsMap = (userId: string)=>{
    setStreamsMap((streamsOld:any) => {
      if(!(userId in  streamsOld)) return  streamsOld
      delete streamsOld[userId]

      return {...streamsOld}
    })
  }

  const repeatTimes = useCallback(
    () => {
      if(!streamsMap) return 2
      const users = Object.keys(streamsMap).length
      if(users > 12) return 4
      if(users > 4) return 3
      if(users > 1) return 2
      return 1
    },
    [streamsMap],
  )

  useEffect(() => {
    (async ()=>{
      const socket = io('/')

      MY_STREAM = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })

      const Peer = require('peerjs').peerjs.Peer
      const peer = new Peer(undefined, {
        host: '/',
        port: 3001,
        path: '/peerjs'
      })

      peer.on('open', (myId: string) => {
        MY_ID = myId
        socket.emit('join-room', {roomId, userId: myId})
        updateStreamsMap(MY_ID, MY_STREAM)
      })

      peer.on('call', (call: any) =>  {
        call.answer(MY_STREAM)
        call.on('stream', (userVideoStream: MediaStream) =>  {
          updateStreamsMap(call.metadata.id, userVideoStream)
        })
      })

      socket.on('user-connected', (userId: string) => {
        const call = peer.call(userId,  MY_STREAM, {metadata: { id: MY_ID} })
        call.on('stream', (userVideoStream: MediaStream) => {
          updateStreamsMap(userId, userVideoStream)
        })
      })

      socket.on('user-disconnected', (userId: string) => {
        deleteFromStreamsMap(userId)
      })
    })()
  }, []);

  return (
      <div style={ {
        ...GridStyles,
        ...(repeatTimes() > 1
            ? {
              gridTemplateColumns: `repeat(${repeatTimes()}, minmax(250px, 1fr))`,
              gridAutoRows: `minmax(min-content, max-content)`
            }
            : {
              justifyContent: 'center',
              height: '100%',
              alignItems: 'center'
            }
        )
      }}>
        {
          streamsMap
            ? Object.entries(streamsMap).map(entries => {
              const [userId, stream] = entries
              return (
                <VideoComponent key={userId} userId={userId} stream={stream} muted={userId === MY_ID}/>
              )
            })
            : null
        }

        <BarBottom stream={MY_STREAM}/>
      </div>

  )
}

const GridStyles:CSSProperties = {
  display:'grid',
  maxWidth: '1280px',
  maxHeight: '960px'
}
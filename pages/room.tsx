import React, {useEffect, useState, useCallback, CSSProperties} from 'react'
import io from 'socket.io-client'
import { IRoomId } from '../utils/api'
import VideoComponent from '../components/videoComponent'
import BarBottom from '../components/barBottom'
import {__peer_host__, __peer_port__, __prod__} from '../utils/env'

Room.getInitialProps = async ( { query }: { query: IRoomId} ) => {
  return { roomId: query.roomId }
}

type StreamMap = {
  [key: string]: MediaStream
}

let MY_ID: string
let MY_STREAM: MediaStream

export default function Room( {roomId}: IRoomId) {
  const [streamsMap, setStreamsMap] = useState<StreamMap | null>(null)

  const updateStreamsMap = (userId: string, stream: MediaStream) => {
    setStreamsMap((streamsOld) => ({...streamsOld, [userId]: stream }))
  }

  const deleteFromStreamsMap = (userId: string )=> {
    setStreamsMap((streamsOld) => {
      if(!streamsOld) return streamsOld
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
      const socket = io()

      MY_STREAM = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const Peer = require('peerjs').peerjs.Peer
      const peer = new Peer(undefined, {
        host: __peer_host__,
        port: __peer_port__,
        path: '/',
        secure: __prod__
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
  }, [])

  return (
      <div style={ {
        ...GridStyles,
        ...(repeatTimes() > 1
            ? {
              gridTemplateColumns: `repeat(${repeatTimes()}, minmax(250px, 1fr))`,
              gridAutoRows: 'minmax(min-content, max-content)'
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
            ? Object.keys(streamsMap).map((userId: string) => {
              const stream = streamsMap[userId]

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

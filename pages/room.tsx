import React, {useEffect, useState} from 'react'
import io from 'socket.io-client'
import { RoomId } from '../utils/api'
import VideoComponent from "../components/videoComponent";
//import VideoComponent from '../components/videoComponent'

Room.getInitialProps = async ( { query }: { query: RoomId} ) => {
  return { roomId: query.roomId }
}

interface IStreamMap {
  userId: string
  stream: MediaStream
}

export default function Room( {roomId}: RoomId) {
  const [streamsMap, setStreamsMap] = useState<IStreamMap | null>(null)

  const updateStreamsMap = (userId: string, stream: MediaStream) => {
    setStreamsMap((streamsOld:any) => ({...streamsOld, [userId]: stream }))
  }

  const deleteFromStreamsMap = (userId: string)=>{
    setStreamsMap((streamsOld:any) => {
      if(!(userId in  streamsOld)) return  streamsOld
      delete streamsOld[userId]
      console.log(streamsOld)
      return streamsOld
    })
  }

  useEffect(() => {
    (async ()=>{
      const socket = io('/')

      const myStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })

      const Peer = require('peerjs').peerjs.Peer
      const peer = new Peer(undefined, {
        host: '/',
        port: 3001,
        path: '/peerjs'
      })

      let MY_ID: any

      peer.on('open', (myId: string) => {
        MY_ID = myId
        socket.emit('join-room', {roomId, userId: myId})
        updateStreamsMap(MY_ID, myStream)
      })

      peer.on('call', (call: any) =>  {
        call.answer(myStream)
        call.on('stream', (userVideoStream: MediaStream) =>  {
          updateStreamsMap(call.metadata.id, userVideoStream)
        })
      })

      socket.on('user-connected', (userId: string) => {
        const call = peer.call(userId,  myStream, {metadata: { id: MY_ID} })
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
    <div>
      {
        streamsMap
          ? Object.entries(streamsMap).map(entries => {
            const [userId, stream] = entries
            return ( <VideoComponent key={userId}  userId={userId} stream={stream} />)
          })
          : null
      }

    </div>
  )
}

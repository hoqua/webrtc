import React from 'react'
import { useRouter } from 'next/router'
import { getRoomId } from '../utils/api'

export default function Home (){
  const Router = useRouter()

  const createRoom = async (event: React.MouseEvent) => {
    event.preventDefault()

    const { roomId } = await getRoomId()
    await Router.push(`/room?roomId=${roomId}`, `/${roomId}`, {shallow: true})
  }

  return (
    <ul>
      <button onClick={createRoom}>
        createRoom
      </button>
    </ul>
  )
}

import React, {useState, useCallback} from 'react'
import { useRouter } from 'next/router'
import InputBase from './inputBase'
import ButtonBase from './buttonBase'

export default function JoinRoomInputPair() {
  const Router = useRouter()
  const [roomId, setRoomId] = useState<string>('')

  const isDisabled = useCallback(
    () => !Boolean(roomId.length),
    [roomId]
  )

  const navigateToRoom = async () => {
     await Router.push(`/room?roomId=${roomId}`, `/${roomId}`, {shallow: true})
  }

  const  handleCodeInputChange = (event: React.ChangeEvent<HTMLInputElement>):void => setRoomId(event.target.value)

  return(
    <React.Fragment>
      <InputBase placeholder="Enter room code" onChange={handleCodeInputChange}/>
      <ButtonBase onClick={navigateToRoom} flat disabled={isDisabled()}> Join room by code </ButtonBase>
    </React.Fragment>
  )
}

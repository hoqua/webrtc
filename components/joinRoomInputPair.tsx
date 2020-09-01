import React, {useState, useCallback} from 'react'
import InputBase from './inputBase'
import ButtonBase from './buttonBase'

type JoinRoomInputPairProps = {
  navigateToRoom(roomId: string): void
}

export default function JoinRoomInputPair({navigateToRoom}:JoinRoomInputPairProps) {
  const [roomId, setRoomId] = useState<string>('')

  const isDisabled = useCallback(
    () => !Boolean(roomId.length),
    [roomId]
  )

  const  handleCodeInputChange = (event: React.ChangeEvent<HTMLInputElement>):void => setRoomId(event.target.value)

  return(
    <React.Fragment>
      <InputBase placeholder="Enter room code" onChange={handleCodeInputChange}/>
      <ButtonBase onClick={() => navigateToRoom(roomId)} flat disabled={isDisabled()}> Join room by code </ButtonBase>
    </React.Fragment>
  )
}

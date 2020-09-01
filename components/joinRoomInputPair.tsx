import React, {useState, useCallback} from 'react'
import InputBase from './inputBase'
import ButtonBase from './buttonBase'

type JoinRoomInputPairProps = {
  onClick(roomId: string): void
}


export default function JoinRoomInputPair({onClick}:JoinRoomInputPairProps) {
  const [roomId, setRoomId] = useState<string>('')

  const isDisabled = useCallback(
    () => !Boolean(roomId.length),
    [roomId]
  )


  const  handleCodeInputChange = (event: React.ChangeEvent<HTMLInputElement>):void => setRoomId(event.target.value)

  return(
    <React.Fragment>
      <InputBase placeholder="Enter room code" onChange={handleCodeInputChange}/>
      <ButtonBase onClick={() => onClick(roomId)} flat disabled={isDisabled()}> Join room by code </ButtonBase>
    </React.Fragment>
  )
}

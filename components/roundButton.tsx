import React, {CSSProperties, useRef} from 'react'
import useHover from '@react-hook/hover'

export default function RoundButton({children}: {children: React.ReactNode}) {
  const target = useRef(null)
  const isHovering = useHover(target, {enterDelay: 50, leaveDelay: 50})
  return(
    <button
      ref={target}
      style={{
        ...ButtonStyles,
        ...(isHovering
          ? {boxShadow: '0 1px 3px 0 rgba(60,64,67,0.302), 0 4px 8px 3px rgba(60,64,67,0.149)'}
          : {backgroundColor: 'transparent'})
      }}
    >
      {children}
    </button>
  )
}

const ButtonStyles:CSSProperties = {
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '56px',
  width: '56px',
  margin: '5px',
  border: '1px solid #dadce0',
  borderRadius: '50%',
  transition: '0.3s ease;'
}
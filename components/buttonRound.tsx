import React, {CSSProperties, useRef} from 'react'
import useHover from '@react-hook/hover'

type  ButtonRoundProps = {
  children: React.ReactNode
  danger?: boolean
  onClick(event: React.MouseEvent<HTMLButtonElement>): void
}

export default function ButtonRound(
  {children, danger = false, onClick}: ButtonRoundProps
) {
  const target = useRef(null)
  const isHovering = useHover(target, {enterDelay: 50, leaveDelay: 50})
  return(
    <button
      onClick={onClick}
      ref={target}
      style={{
        ...ButtonStyles,
        ...(isHovering
            ? {boxShadow: '0 1px 3px 0 rgba(60,64,67,0.302), 0 4px 8px 3px rgba(60,64,67,0.149)'}
            : {}
        ),
        ...(danger
            ?{backgroundColor: '#d93025', color: '#ffffff'}
            :{}
        )
      }}
    >
      {children}
    </button>
  )
}

const ButtonStyles:CSSProperties = {
  color: '#5f6368',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  outline: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '56px',
  width: '56px',
  margin: '5px',
  border: '1px solid #dadce0',
  borderRadius: '50%',
  transition: '0.3s ease'
}
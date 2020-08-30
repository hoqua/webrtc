import React, {CSSProperties, useRef} from 'react'
import useHover from '@react-hook/hover'

type ButtonBasePropsType = {
  children: React.ReactNode
  flat?: boolean
  disabled?: boolean
  onClick(event: React.MouseEvent<HTMLButtonElement>): void
}

export default function ButtonBase(
  {children, flat = false, disabled = false, onClick}: ButtonBasePropsType
) {
  const target = useRef(null)
  const isHovering = useHover(target, {enterDelay: 50, leaveDelay: 50})

  return(
    <button
      onClick={onClick}
      ref={target}
      style={{
        ...ButtonStyles,
        filter: isHovering ? 'brightness(85%)' : 'none',
        ...(flat
            ? {backgroundColor: 'transparent', color: disabled ? '#80868b' : '#bd93f9'}
            : {backgroundColor: '#bd93f9', color: disabled ? '#80868b' : '#f8f8f2'}
        ),
        cursor: disabled ? 'default' : 'pointer'
      }}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

const ButtonStyles:CSSProperties = {
  outline: 'none',
  height: '48px',
  width: '160px',
  marginRight: '10px',
  //border: '1px solid #dadce0',
  border: 'none',
  fontWeight: 'bold',
  borderRadius: '3px ',
  transition: '0.3s ease'
}
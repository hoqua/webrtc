import React, {CSSProperties, useRef} from 'react'
import useHover from '@react-hook/hover'



export default function ButtonBase(
  {children, flat = false, onClick}: {children: React.ReactNode, flat?: boolean, onClick: () => void }
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
            ? {filter: 'brightness(85%)'}
            : {}
        ),
        ...(flat
            ? {backgroundColor: 'transparent', color: '#bd93f9'}
            : {backgroundColor: '#bd93f9', color: '#f8f8f2',}
        )

      }}
    >
      {children}
    </button>
  )
}

const ButtonStyles:CSSProperties = {

  cursor: 'pointer',
  outline: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '48px',
  width: '160px',
  marginRight: '10px',
  //border: '1px solid #dadce0',
  border: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  borderRadius: '3px ',
  transition: '0.3s ease'
}
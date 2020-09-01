import React, {CSSProperties, useRef} from 'react'
import useHover from '@react-hook/hover'

type InputBaseProps = {
  placeholder: string
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
}

export default function InputBase({ placeholder, onChange }: InputBaseProps) {
  const target = useRef(null)
  const isHovering = useHover(target, {enterDelay: 50, leaveDelay: 50})

  return(
    <input
      onChange={onChange}
      placeholder={placeholder}
      className="placeholder-fix"
      ref={target}
      style={{
        ...InputStyles,
        filter: isHovering ?'brightness(85%)' : 'none'
      }}
    />
  )
}

const InputStyles:CSSProperties = {
  outline: 'none',
  height: '48px',
  width: '145px',
  marginRight: '10px',
  padding: '0 0 0 15px',
  border: 'none',
  fontWeight: 'bold',
  borderRadius: '3px ',
  transition: '0.3s ease'
}
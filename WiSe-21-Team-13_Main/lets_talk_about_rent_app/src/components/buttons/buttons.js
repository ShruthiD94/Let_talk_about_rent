import React from 'react'
import { colors } from '../../style.config'

export function PrimaryButton({onClick, className, type="button", children}) {
  return (
    <button type={type} className={"btn " + className} style={{"backgroundColor" : colors.primary, "color" : "white", "borderRadius" : "10px"}} onClick={onClick}>
        {children}
    </button>
  )
}

export function SecondaryButton({onClick, className, type="button", children}) {
    return (
      <button type={type} className={"btn " + className} style={{"backgroundColor" : colors.secondary, "color" : "white", "borderRadius" : "10px"}} onClick={onClick}>
          {children}
      </button>
    )
}



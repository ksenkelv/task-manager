import { ReactNode } from 'react'
import { Button } from '@mui/material'

type ButtonType = 'button' | 'submit' | 'reset' | undefined

type PropsType = {
  text?: string
  disabled?: boolean
  startIcon?: ReactNode
  contentIcon?: ReactNode
  isRegister?: boolean
  onClick?: (event?: any) => void
  outlined?: boolean
  type?: ButtonType
  width?: string
  noShadow?: boolean
}

export default function PrimaryButton({
  text, disabled, startIcon, contentIcon,
  isRegister, onClick, outlined, type, width, noShadow
}: PropsType) {
  return (
    <Button
      variant={ outlined ? 'outlined' : 'contained' }
      sx={ {
        textTransform: 'none',
        padding: isRegister ? '2px 25px' : undefined,
        margin: isRegister ? '5px 0px' : undefined,
        fontFamily: 'Source Sans Pro, sans-serif',
        fontSize: isRegister ? '12px' : undefined,
        width: width && width,
        boxShadow: noShadow ? 'none' : undefined
      } }
      disabled={ disabled }
      startIcon={ startIcon }
      onClick={ onClick }
      type={ type || 'button' }
    >
      { text }
      { contentIcon }
    </Button>
  )
}

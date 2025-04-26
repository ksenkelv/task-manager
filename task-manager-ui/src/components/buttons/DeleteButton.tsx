import { ReactNode } from 'react'
import { Button } from '@mui/material'

type PropsType = {
  text: string
  contained?: boolean
  startIcon?: ReactNode
  isRegister?: boolean
  onClick?: () => void
}

export default function DeleteButton({ text, contained, startIcon, isRegister, onClick }: PropsType) {
  return (
    <Button
      color="error"
      variant={ contained ? 'contained' : 'outlined' }
      sx={ {
        textTransform: 'none',
        padding: isRegister ? '2px 25px' : undefined,
        margin: isRegister ? '5px 0px' : undefined,
        fontFamily: 'Source Sans Pro, sans-serif',
        fontSize: isRegister ? '12px' : undefined
      } }
      startIcon={ startIcon }
      onClick={ onClick }
    >
      { text }
    </Button>
  )
}

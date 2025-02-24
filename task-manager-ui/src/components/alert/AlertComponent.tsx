import { Alert, AlertColor, AlertPropsColorOverrides, IconButton, Snackbar } from '@mui/material'
import { OverridableStringUnion } from '@mui/types'
import React, { useEffect } from 'react'
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon'
import { AlertType } from '@/types/AlertTypes'

type PropsType = {
  open: boolean
  setAlert: (alert: AlertType) => void
  severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined
  msg: string
  autoHideDuration?: number
}

const borderColors = {
  'error': '#c9263a',
  'warning': '#ef9621',
  'success': '#3a8d48',
  'info': '#94d1ec'
}

export default function AlertComponent({ open, setAlert, severity, msg, autoHideDuration }: PropsType) {

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setAlert({ open: false, severity: undefined, msg: '' })
      }, autoHideDuration ? autoHideDuration : (severity == 'success' ? 3000 : 8000))

      return () => clearTimeout(timer)
    }
  }, [open, setAlert])

  return (
    <Snackbar
      sx={ { width: '50%' } }
      open={ open }
      transitionDuration={ 500 }
      anchorOrigin={ { vertical: 'top', horizontal: 'center' } }
    >
      <Alert
        sx={ {
          display: 'flex',
          width: '100%',
          p: '0.2rem 1.2rem',
          mb: 2,
          borderRadius: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: severity && borderColors[severity],
        } }
        severity={ severity }
        variant={ 'filled' }
        action={
          <IconButton color="inherit" size="small"
                      onClick={ () => setAlert({ open: false, severity: undefined, msg: '' }) }>
            <CloseIcon/>
          </IconButton>
        }
      >
        <p style={ { fontSize: '16px' } }>{ msg }</p>
      </Alert>
    </Snackbar>
  )
}

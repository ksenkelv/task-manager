import { Alert, AlertColor, AlertPropsColorOverrides, IconButton, Snackbar } from '@mui/material'
import { OverridableStringUnion } from '@mui/types'
import React, { useEffect } from 'react'
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon'
import { AlertType } from '@/types/AlertTypes'
import PrimaryButton from '../buttons/PrimaryButton'
import DeleteButton from '../buttons/DeleteButton'

type PropsType = {
  open: boolean
  setAlert: (alert: AlertType) => void
  severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined
  msg: string
  autoHideDuration?: number
  onConfirm?: () => void
  onCancel?: () => void
  showActions?: boolean
}

export default function AlertConfirmationComponent({
                                                     open,
                                                     setAlert,
                                                     severity,
                                                     msg,
                                                     autoHideDuration,
                                                     onConfirm,
                                                     onCancel,
                                                     showActions = false
                                                   }: PropsType) {
  useEffect(() => {
    if (open && !showActions) {
      const timer = setTimeout(() => setAlert({ open: false, severity: undefined, msg: '' }), autoHideDuration)
      return () => clearTimeout(timer)
    }
  }, [open, setAlert, showActions, autoHideDuration])

  const handleClose = () => {
    setAlert({ open: false, severity: undefined, msg: '' })
    if (onCancel) onCancel()
  }

  return (
    <Snackbar
      sx={ { width: '70%' } }
      open={ open }
      transitionDuration={ 500 }
      anchorOrigin={ { vertical: 'top', horizontal: 'center' } }
    >
      <Alert
        sx={ {
          display: 'flex',
          width: '100%',
          p: '0.5rem 2rem',
          mb: 2,
          borderRadius: 2,
          alignItems: 'center',
          justifyContent: 'space-between'
        } }
        severity={ severity }
        action={ !showActions ?
          <IconButton color="inherit" size="small" onClick={ handleClose }><CloseIcon/></IconButton> :
          <div style={ { display: 'flex', gap: '5px' } }><PrimaryButton text="OK" onClick={ onConfirm }/><DeleteButton
            text="Katkesta" onClick={ handleClose } contained/></div> }
        variant="filled"
      >
        <p style={ { fontSize: '16px' } }>{ msg }</p>
      </Alert>
    </Snackbar>
  )
}

import React, { ChangeEvent, ChangeEventHandler } from 'react'
import { TextField, Theme } from '@mui/material'

type PropsType = {
  value: string | number | null
  label: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onlyNumber?: boolean
  required?: boolean
  error?: boolean
}

export default function TextFieldComponent({ value, label, onChange, onlyNumber, required, error }: PropsType) {

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: (theme: Theme) => theme.palette.secondary.light,
      },
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    if (/^\d*$/.test(newValue) && onChange) {
      onChange(event)
    }
  }

  return (
    <TextField
      value={ value ?? '' }
      label={ label }
      onChange={ onlyNumber ? handleInputChange : onChange }
      required={ required }
      sx={ textFieldStyles }
      error={ error }
    />
  )
}

import React, { ChangeEvent, ChangeEventHandler } from 'react'
import { TextField } from '@mui/material'

type PropsType = {
  value: string | number | undefined
  label: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onlyNumber?: boolean
}

export default function SearchInputComponent({ value, label, onChange, onlyNumber }: PropsType) {

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/\D/g, '')

    const modifiedEvent = {
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    }

    onChange(modifiedEvent as ChangeEvent<HTMLInputElement>)
  }

  return (
    <TextField
      value={ value }
      label={ label }
      focused
      onChange={ onlyNumber ? handleInputChange : onChange }
      sx={{
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: (theme) => theme.palette.secondary.light,
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: (theme) => theme.palette.primary.main,
        },
      }}
    />
  )
}

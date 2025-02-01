import React, { ChangeEventHandler } from 'react'
import { TextField } from '@mui/material'

type PropsType = {
  value: string | number | undefined | null
  label: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export default function SearchInputComponent({ value, label, onChange }: PropsType) {

  return (
    <TextField
      value={ value }
      label={ label }
      onChange={ onChange }
      color='primary'
      // sx={ {
      //   '& .MuiOutlinedInput-notchedOutline': {
      //     border: '1px solid #f39a5b'
      //   },
      //
      //   '& .MuiFormLabel-root.MuiInputLabel-root': {
      //     fontSize: '14px',
      //     paddingTop: '3px'
      //   }
      // } }
    />
  )
}

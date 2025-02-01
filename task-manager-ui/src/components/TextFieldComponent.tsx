import { ChangeEventHandler } from 'react'
import EuroIcon from '@mui/icons-material/Euro'

import styles from './textFieldComponent.module.scss'

type PropsType = {
  value: string | number | undefined
  onChange?: ChangeEventHandler<HTMLInputElement>
  label?: string
  placeholder?: string
  euroEnd?: boolean
  disabled?: boolean
  onlyNumber?: boolean
  type?: string
  required?: boolean
  error?: boolean
}

export default function TextFieldComponent({ value, onChange, label, placeholder, euroEnd, disabled, onlyNumber, type, required, error}: PropsType) {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    if (/^\d*$/.test(newValue) && onChange) {
      onChange(event)
    }
  }

  return (
    <div className={ styles.inputWrapper }>
      { onlyNumber ? (
        <>
          <input disabled={ disabled }
                 className={ styles.field }
                 value={ value }
                 onChange={ handleInputChange }
                 inputMode="numeric"
                 pattern="[0-9]*"
          />
        </>

      ) : (
        <input disabled={ disabled }
               className={ disabled ? styles.deactivateField : error ? styles.errorField : styles.field }
               value={ value }
               onChange={ onChange }
               type={ type || 'text' }
               placeholder={ placeholder }
               required={ required }
        />
      ) }
    </div>
  )
}

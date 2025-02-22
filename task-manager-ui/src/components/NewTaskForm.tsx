import { Dispatch, SetStateAction } from "react";
import TextFieldComponent from "@/components/TextFieldComponent";
import PrimaryButton from "@/components/PrimaryButton";
import styles from './newTaskForm.module.scss'

type PropsType = {
  inputTitle: string
  setInputTitle: Dispatch<SetStateAction<string>>
  inputHours: number
  setInputHours: Dispatch<SetStateAction<number>>
  handleSaveButtonClick: () => void
}

export default function NewTaskForm({ inputTitle, setInputTitle, inputHours, setInputHours, handleSaveButtonClick } : PropsType) {

  return (
    <>
      <div className={ styles.inputContainer }>
        <TextFieldComponent
          value={ inputTitle }
          onChange={ (event: any) => setInputTitle(event.target.value) }
          // label={ 'Sisesta asukoha nimi' }
        />
        <TextFieldComponent
          value={ inputHours }
          onChange={ (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value
            setInputHours(value ? parseInt(value, 10) : 0)
          } }
          // label={ 'Sisesta asukoha nimi' }
          onlyNumber={ true }
        />
      </div>
      <div className={ styles.modalSaveButton }>
        <PrimaryButton text={ 'Save' } onClick={ handleSaveButtonClick }/>
      </div>
    </>
  )
}
import { Dispatch, SetStateAction } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import styles from './newTaskForm.module.scss'
import TextFieldComponent from "./TextFieldComponent";

type PropsType = {
  inputTitle: string | null
  setInputTitle: Dispatch<SetStateAction<string>>
  inputHours: number | null
  setInputHours: Dispatch<SetStateAction<number|null>>
  handleSaveButtonClick: () => void
}

export default function NewTaskForm({ inputTitle, setInputTitle, inputHours, setInputHours, handleSaveButtonClick } : PropsType) {

  return (
    <>
      <div className={ styles.inputContainer }>
        <TextFieldComponent
          value={ inputTitle }
          onChange={ (event: any) => setInputTitle(event.target.value) }
          label={ 'Add title' }
        />
        <TextFieldComponent
          value={ inputHours }
          onChange={ (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value
            setInputHours(value ? parseInt(value, 10) : 0)
          } }
          label={ 'Add estimated hours' }
          onlyNumber={ true }
        />
      </div>
      <div className={ styles.modalSaveButton }>
        <PrimaryButton text={ 'Save' } onClick={ handleSaveButtonClick }/>
      </div>
    </>
  )
}

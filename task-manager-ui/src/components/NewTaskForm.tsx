import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import styles from './newTaskForm.module.scss'
import TextFieldComponent from "./TextFieldComponent";
import { TaskFieldsType } from "@/types/TaskTypes";

type PropsType = {
  inputTitle: string
  setInputTitle: Dispatch<SetStateAction<string>>
  inputHours: number | null
  setInputHours: Dispatch<SetStateAction<number | null>>
  handleSaveButtonClick: () => void
  fieldErrors?: TaskFieldsType
}

export default function NewTaskForm({
  inputTitle,
  setInputTitle,
  inputHours,
  setInputHours,
  handleSaveButtonClick,
  fieldErrors,
}: PropsType) {

  return (
    <>
      <div className={ styles.inputContainer }>
        <TextFieldComponent
          value={ inputTitle }
          onChange={ (event: any) => setInputTitle(event.target.value) }
          label={ 'Add title' }
          required={ true }
          error={ fieldErrors?.title }
        />
        <TextFieldComponent
          value={ inputHours }
          onChange={ (event: ChangeEvent<HTMLInputElement>) => {
            setInputHours(event.target.value ? parseInt(event.target.value, 10) : null)
          } }
          label={ 'Add estimated hours' }
          onlyNumber={ true }
          required={ true }
          error={ fieldErrors?.estimatedHours }
        />
      </div>
      <div className={ styles.modalSaveButton }>
        <PrimaryButton text={ 'Save' } onClick={ handleSaveButtonClick }/>
      </div>
    </>
  )
}

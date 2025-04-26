import React, { ChangeEvent, useState } from "react";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import styles from './newTaskForm.module.scss'
import TextFieldComponent from "./TextFieldComponent";
import { TaskFieldsType } from "@/types/TaskTypes";
import { AlertType } from "@/types/AlertTypes";
import { save } from "@/services/requests/Save";
import AlertComponent from "@/components/alert/AlertComponent";

type PropsType = {
  handleCloseModal: () => void
}

export default function NewTaskForm({ handleCloseModal }: PropsType) {

  const [alert, setAlert] = useState<AlertType>()
  const [inputTitle, setInputTitle] = useState<string>('')
  const [inputHours, setInputHours] = useState<number | null>(null)

  const [fieldErrors, setFieldErrors] = useState<TaskFieldsType>({
    title: false,
    estimatedHours: false,
  })

  const saveTask = async (title: string, hours: number, setAlert: (alert: AlertType) => void) => {
    try {
      const response = await save(title, hours)

      if (response.success) {
        setAlert({ open: true, severity: 'success', msg: 'Task created successfully.' })
        return
      } else if (!response) {
        setAlert({ open: true, severity: 'error', msg: 'Failed to create task.' })
        return
      } else if (response.status === 400) {
        setAlert({ open: true, severity: 'error', msg: 'Failed to create task. The data is not valid.' })
        return
      }
    } catch (e) {
      return { success: false, message: 'Request error', status: 500 }
    }
  }

  const handleSaveButtonClick = async () => {
    if (inputTitle && inputHours) {
      await saveTask(inputTitle.trim(), inputHours, setAlert)
      handleCloseModal()
      setInputTitle('')
      setInputHours(null)
    }

    const newFieldErrors = {
      title: !inputTitle,
      estimatedHours: !inputHours,
    }
    setFieldErrors(newFieldErrors)
  }


  return (
    <>
      { alert && alert.open && <AlertComponent open={ alert.open } severity={ alert.severity } msg={ alert.msg }
                                               autoHideDuration={ alert.autoHideDuration } setAlert={ setAlert }/> }
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

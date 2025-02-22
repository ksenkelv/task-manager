import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import React, {Dispatch, SetStateAction} from "react";
import styles from './filters.module.scss'
import TextFieldComponent from "@/components/TextFieldComponent";

type PropsType = {
  title: string | null
  setTitle: Dispatch<SetStateAction<string | null>>
  maxHours: number | null
  setHours: Dispatch<SetStateAction<number | null>>
  handleAddNewButtonClick: () => void
}

export default function Filters({ title, setTitle, maxHours, setHours, handleAddNewButtonClick }: PropsType) {
  return (
    <div className={styles.filterContainer}>
      <TextFieldComponent value={ title } onChange={(event: any) => setTitle(event.target.value)} label={'Search by title'}/>
      <TextFieldComponent value={ maxHours } onChange={(event: any) => setHours(event.target.value)} label={'Filter by hours'} onlyNumber={true}/>
      <div className={styles.buttonContainer}>
        <Fab size="medium" color="secondary" aria-label="add">
          <AddIcon onClick={ handleAddNewButtonClick }/>
        </Fab>
      </div>
    </div>
  )
}

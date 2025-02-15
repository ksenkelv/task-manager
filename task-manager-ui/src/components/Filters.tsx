import SearchInputComponent from "@/components/SearchInputComponent";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import React, { Dispatch, SetStateAction } from "react";
import styles from './filters.module.scss'

type PropsType = {
  title: string | undefined
  setTitle: Dispatch<SetStateAction<string>>
  maxHours: number | undefined
  setHours: Dispatch<SetStateAction<undefined>>
  handleAddNewButtonClick: () => void
}

export default function Filters({ title, setTitle, maxHours, setHours, handleAddNewButtonClick }: PropsType) {
  return (
    <div className={styles.filterContainer}>
      <SearchInputComponent value={ title } onChange={(event: any) => setTitle(event.target.value)} label={"Search by name"}/>
      <SearchInputComponent value={ maxHours } onChange={(event: any) => setHours(event.target.value)} label={"Filter by hours"} onlyNumber={true}/>
      <div className={styles.buttonContainer}>
        <Fab size="medium" color="secondary" aria-label="add">
          <AddIcon onClick={ handleAddNewButtonClick }/>
        </Fab>
      </div>
    </div>
  )
}
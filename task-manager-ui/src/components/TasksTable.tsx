import React, { useEffect, useState } from 'react'

import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { getAllTasks } from "@/services/requests/GetAllTasks"
import { TaskType } from "@/types/TaskTypes"
import { styled } from '@mui/material/styles'
import { tableCellClasses } from "@mui/material"
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import SearchInputComponent from "@/components/SearchInputComponent";
import Filters from "@/components/Filters";
import CustomModal from "@/components/CustomModal";
import TextFieldComponent from "@/components/TextFieldComponent";
import PrimaryButton from "@/components/PrimaryButton";
import styles from './taskTable.module.scss'
import { save } from "@/services/requests/Save";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}))

export default function TasksTable() {

  const [tasks, setTasks] = useState<TaskType[]>([])
  const [title, setTitle] = useState('')
  const [maxHours, setMaxHours] = useState(undefined)
  const [showModal, setShowModal] = useState(false)
  const [inputTitle, setInputTitle] = useState('')
  const [inputHours, setInputHours] = useState(0)

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks(maxHours)
      if (response?.success) {
        setTasks(response.data)
      }
    } catch (ignore) {}
  }

  const saveTask = async (title: string, hours: number) => {

    try {
      const response = await save(title, hours)
      if (response?.success) {
        fetchTasks()
      }
    } catch (ignore) {}
  }

  const handleAddNewButtonClick = () => {
    setShowModal(true)
  }

  const handleSaveButtonClick = async () => {
    await saveTask(inputTitle.trim(), inputHours)
    setShowModal(false)
    setInputTitle('')
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setInputTitle('')
  }

  useEffect(() => {
    fetchTasks()
  }, [maxHours])

  return (
    <div>
      <Filters title={title} setTitle={setTitle} maxHours={maxHours} setHours={setMaxHours} handleAddNewButtonClick={handleAddNewButtonClick}/>
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={ { padding: '15px 25px', fontWeight: '700' } }>Id</StyledTableCell>
              <StyledTableCell sx={ { padding: '15px 25px', fontWeight: '700' } }>Title</StyledTableCell>
              <StyledTableCell sx={ { padding: '15px 25px', fontWeight: '700' } }>Hours</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            { tasks && tasks.map((task) => (
              <StyledTableRow key={ task.id }>
                <StyledTableCell sx={ { padding: '15px 25px' } }>{ task.id }</StyledTableCell>
                <StyledTableCell sx={ { padding: '15px 25px' } }>{ task.title }</StyledTableCell>
                <StyledTableCell sx={ { padding: '15px 25px' } }>{ task.estimatedHours }</StyledTableCell>
              </StyledTableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
      <CustomModal showModal={ showModal } handleCloseModal={ handleCloseModal }>
        <div className={styles.inputContainer}>
          <TextFieldComponent
            value={ inputTitle }
            onChange={ (event: any) => setInputTitle(event.target.value) }
            // label={ 'Sisesta asukoha nimi' }
          />
          <TextFieldComponent
            value={ inputHours }
            onChange={ (event: any) => setInputHours(event.target.value) }
            // label={ 'Sisesta asukoha nimi' }
            onlyNumber={ true }
          />
        </div>
        <div className={ styles.modalSaveButton }>
          <PrimaryButton text={ 'Save' } onClick={ handleSaveButtonClick }/>
        </div>
      </CustomModal>
    </div>
  )
}
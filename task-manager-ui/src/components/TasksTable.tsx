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
import Filters from "@/components/Filters";
import CustomModal from "@/components/CustomModal";
import NewTaskForm from "@/components/NewTaskForm";
import styles from "@/components/tasksTable.module.scss";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

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
  const [title, setTitle] = useState<string | null>(null)
  const [maxHours, setMaxHours] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks(title, maxHours)
      if (response?.success) {
        setTasks(response.data)
      }
    } catch (ignore) {}
  }

  const handleAddNewButtonClick = () => {
    // setFieldErrors({ title: false, estimatedHours: false })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    fetchTasks()
  }

  useEffect(() => {
    fetchTasks()
  }, [title, maxHours])

  return (
    <div>
      <div className={ styles.topContainer }>
        <Filters title={ title } setTitle={ setTitle } maxHours={ maxHours } setHours={ setMaxHours }/>
        <div className={ styles.buttonContainer }>
          <Fab size="medium" color="secondary" aria-label="add" onClick={ handleAddNewButtonClick }>
            <AddIcon/>
          </Fab>
        </div>
      </div>
      <TableContainer>
        <Table sx={ { minWidth: 700 } } aria-label="customized table">
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
        <NewTaskForm handleCloseModal={ handleCloseModal }/>
      </CustomModal>
    </div>
  )
}

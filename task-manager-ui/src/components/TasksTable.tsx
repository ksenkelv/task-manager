import React, { useEffect, useState } from 'react'

import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { getAllTasks } from "@/services/requests/GetAllTasks"
import { TaskFieldsType, TaskType } from "@/types/TaskTypes"
import { styled } from '@mui/material/styles'
import { tableCellClasses } from "@mui/material"
import Filters from "@/components/Filters";
import CustomModal from "@/components/CustomModal";
import { save } from "@/services/requests/Save";
import NewTaskForm from "@/components/NewTaskForm";
import AlertComponent from "@/components/alert/AlertComponent";
import { AlertType } from "@/types/AlertTypes";

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
  const [alert, setAlert] = useState<AlertType>()

  const [title, setTitle] = useState<string | null>(null)
  const [maxHours, setMaxHours] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [inputTitle, setInputTitle] = useState<string>('')
  const [inputHours, setInputHours] = useState<number | null>(null)

  const [fieldErrors, setFieldErrors] = useState<TaskFieldsType>({
    title: false,
    estimatedHours: false,
  })

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks(maxHours)
      if (response?.success) {
        setTasks(response.data)
      }
    } catch (ignore) {}
  }

  const saveTask = async (title: string, hours: number, setAlert: (alert: AlertType) => void) => {
    try {
      const response = await save(title, hours)

      if (response.success) {
        await fetchTasks()
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

  const handleAddNewButtonClick = () => {
    setFieldErrors({ title: false, estimatedHours: false })
    setShowModal(true)
  }

  const handleSaveButtonClick = async () => {
    if (inputTitle && inputHours) {
      await saveTask(inputTitle.trim(), inputHours, setAlert)
      setShowModal(false)
      setInputTitle('')
      setInputHours(null)
    }

    const newFieldErrors = {
      title: !title,
      estimatedHours: !maxHours,
    }
    setFieldErrors(newFieldErrors)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setInputTitle('')
    setInputHours(null)
  }

  useEffect(() => {
    fetchTasks()
  }, [maxHours])

  return (
    <>
      { alert && alert.open && <AlertComponent open={ alert.open } severity={ alert.severity } msg={ alert.msg }
                                               autoHideDuration={ alert.autoHideDuration } setAlert={ setAlert }/> }
      <div>
        <Filters title={ title } setTitle={ setTitle } maxHours={ maxHours } setHours={ setMaxHours }
                 handleAddNewButtonClick={ handleAddNewButtonClick }/>
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
          <NewTaskForm inputTitle={ inputTitle } setInputTitle={ setInputTitle } inputHours={ inputHours }
                       setInputHours={ setInputHours } handleSaveButtonClick={ handleSaveButtonClick }
                       fieldErrors={ fieldErrors }/>
        </CustomModal>
      </div>
    </>
  )
}

import { Box, Modal } from "@mui/material";
import RemoveButton from '@/components/RemoveButton'
import React, { ReactNode } from "react";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  minWidth: '600px',
  maxWidth: '90%',
  maxHeight: '90vh',
  backgroundColor: 'background.paper',
  border: 'none',
  borderRadius: '10px',
  boxShadow: 4,
  p: 4,
  padding: '30px',
  overflow: 'auto',
  scrollbarWidth: 'none',
}

type PropsType = {
  showModal: boolean
  handleCloseModal: () => void
  children: ReactNode
  width?: string | number
  confirmation?: boolean
}

export default function CustomModal({ showModal, handleCloseModal, children, width, confirmation }: PropsType) {

  const customStyle = { ...style, width: width || 'auto' }

  return (
    <div>
      <Modal
        open={ showModal }
        onClose={ handleCloseModal }
      >
        <Box sx={ customStyle }>
          { !confirmation && <div style={{ paddingBottom: '10px' }}><RemoveButton onClick={ handleCloseModal }/></div> }
          { children }
        </Box>
      </Modal>
    </div>
  )
}
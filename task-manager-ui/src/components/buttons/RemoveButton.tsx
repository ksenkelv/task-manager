import { IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear'

type PropsType = {
  secondary?: boolean
  small?: boolean
  onClick?: () => void
  disabled?: boolean
}

export default function RemoveButton({ secondary, small, onClick, disabled }: PropsType) {
  return (
    <div>
      <IconButton
        size={ small ? "small" : "medium"}
        color={ secondary ? 'secondary' : 'default' }
        onClick={ onClick }
        sx={ {
          height: '30px',
          width: '30px',
          padding: '0px'
        } }
        disabled={ disabled }
      >
        <ClearIcon fontSize="inherit"/>
      </IconButton>
    </div>
  )
}
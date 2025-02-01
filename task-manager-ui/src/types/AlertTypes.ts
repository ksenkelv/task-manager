import {OverridableStringUnion} from "@mui/types";
import {AlertColor, AlertPropsColorOverrides} from "@mui/material";

export type AlertType = {
    open: boolean
    severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined
    msg: string
    autoHideDuration?: number
}
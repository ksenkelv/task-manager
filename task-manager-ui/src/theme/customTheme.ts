import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
      light: '#969696',
      dark: '#494949',
    },
    secondary: {
      main: '#c41653',
      light: '#d26288',
      dark: '#800d35',
    },
    background: {
      default: '#f4f7f0',
    },
    error: {
      main: '#b30000',
      dark: '#5a0000',
      light: '#c90000',
    },
    info: {
      main: '#349fda',
      light: '#387ea4',
      dark: '#075077',
    },
    success: {
      main: '#269463',
      light: '#399a64',
    },
  },

});

export default theme;
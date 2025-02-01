// pages/_app.tsx

import { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { FC } from 'react';
import theme from "@/theme/customTheme";


const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Нормализует стили */}
        <Component {...pageProps} />
      </ThemeProvider>
  );
};

export default MyApp;

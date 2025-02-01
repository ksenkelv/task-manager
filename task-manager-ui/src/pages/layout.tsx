
import { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';

type PropsType = {
    children: ReactNode;
}

export default function Layout({ children }: PropsType) {
    return (
        <Box>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6">Мой сайт</Typography>
                </Toolbar>
            </AppBar>
            <Container>
                {children} {/* Контент страницы будет отображаться здесь */}
            </Container>
        </Box>
    );
};

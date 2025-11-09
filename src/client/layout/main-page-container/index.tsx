import React from 'react';
import Container from '@mui/material/Container';

interface MainPageContainerProps {
    className?: string;
    children: React.ReactNode;
}

export const MainPageContainer: React.FC<MainPageContainerProps> = ({ children, className }) => {
    const classList = `full-screen-page-container ${className}`;

    return (
        <Container className={classList} maxWidth="xl" sx={{ p: 2 }}>
            {children}
        </Container>
    );
};

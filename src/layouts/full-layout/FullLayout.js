import React, { useState } from 'react';
import { experimentalStyled, Container, Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';
import Footer from './footer/Footer';
import { TopbarHeight } from '../../assets/global/Theme-variable';

const MainWrapper = experimentalStyled('div')(() => ({
    display: 'flex',
    minHeight: '100vh',
    overflow: 'hidden',
    width: '100%',
}));
const PageWrapper = experimentalStyled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',

    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('lg')]: {
        paddingTop: TopbarHeight,
    },
    [theme.breakpoints.down('lg')]: {
        paddingTop: '50px',
    },
}));

const FullLayout = () => {
    const customizer = useSelector((state) => state.CustomizerReducer);
    return (
        <MainWrapper className={customizer.activeMode === 'dark' ? 'darkbg' : ''}>
            <Header
                sx={{
                    zIndex: '2400',
                    marginBottom: 100,
                    backgroundColor: customizer.activeMode === 'dark' ? '#20232a' : '#fff',
                }}
            />
            <PageWrapper>
                <Container maxWidth={false} >
                    <Box mx={{ lg: 10 }} sx={{ minHeight: 'calc(100vh - 170px)' }}>
                        <Outlet />
                    </Box>
                </Container>
            </PageWrapper>
        </MainWrapper >
    );
};

export default FullLayout;

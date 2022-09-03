import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import FeatherIcon from 'feather-icons-react'
import { SidebarWidth } from '../../../assets/global/Theme-variable';
import { useMediaQuery } from '@mui/material';


const drawerWidth = SidebarWidth;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(6)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(6)} + 1px)`,
    },
});




const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


export default function MiniDrawer({ children, handleDrawerToggle, open, setOpen }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer PaperProps={{
                sx: {
                    backgroundColor: (theme) => `${theme.palette.sidebar.bg}!important`,
                    color: (theme) => `${theme.palette.sidebar.text}!important`,

                }
            }} variant="permanent" sx={{ marginTop: 100 }} open={open}>
                <IconButton sx={{ marginTop: 7, borderRadius: 0, py: 2, position: 'relative' }} onClick={handleDrawerToggle}>
                    {open ? <FeatherIcon icon='chevron-left' style={{ position: 'absolute', right: 0 }} /> : <FeatherIcon style={{ position: 'absolute', left: 14 }} icon='chevron-right' />}
                </IconButton>
                <List>
                    {children}
                </List>
            </Drawer>
        </Box>
    );
}
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ py: 1, mt: 5, textAlign: 'center', borderRadius: 1, bgcolor: (theme) => theme.palette.primary.light }}>
            <Typography fontSize={12}>Copyright © 2022  - All Rights Reserved.</Typography>
        </Box>
    )
}



export default Footer;

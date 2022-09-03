import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import { CardContent, Paper } from '@mui/material';

const FullPageContainer = ({ title, description, children, brdcrumsTitle, brdcrumsItems }) => (
    <div>
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
        <Paper sx={{ width: '100%' }}>
            {children}
        </Paper>
    </div>
);

FullPageContainer.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node,
};

export default FullPageContainer;

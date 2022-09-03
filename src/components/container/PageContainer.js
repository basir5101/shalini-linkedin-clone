import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import { CardContent, Paper } from '@mui/material';

const PageContainer = ({ title, description, children }) => (
  <div>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>

    <CardContent sx={{ p: 0, mt: 0.5 }}>
      <Paper sx={{ width: '100%' }}>
        {children}
      </Paper>
    </CardContent>
  </div>
);

PageContainer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default PageContainer;

import React from 'react';
import { Grid, Typography, Box, Breadcrumbs, Link, Divider, IconButton } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react'




const Breadcrumb = ({ subtitle, items, title, children, back, handleBack }) => {
  const navigate = useNavigate()
  return (
    <Grid
      mt={0.8}
      container

    >
      <Grid item xs={12} sm={12} lg={12}>
        {
          subtitle && <Typography color="textSecondary" fontWeight="400" variant="h4">
            {subtitle}
          </Typography>
        }

        <Breadcrumbs
          sx={{
            "& li": {
              m: 0
            }
          }}
          // separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          separator={<FeatherIcon icon={'chevron-right'} size={15} />} aria-label="breadcrumb">
          {items
            ? items.map((item) => (
              <div key={item.title}>
                {item.to ? (
                  <Link underline="none" color="#1e4db7" margin={0} component={NavLink} to={item.to} variant='caption' >
                    {item.title}
                  </Link>
                ) : (
                  <Typography variant='caption' margin={0} color="textPrimary">{item.title}</Typography>
                )}
              </div>
            ))
            : ''}
        </Breadcrumbs>
        <Divider sx={{ width: '100%', mt: 0.3 }} />
        <Typography
          fontWeight="600"
          mt="5px"
          variant="h4"
          sx={{
            lineHeight: '1.035'
          }}
        >
          {
            back && <IconButton onClick={() => navigate(-1)}>
              <FeatherIcon icon={'arrow-left'} size={15} />
            </IconButton>
          }
          {title}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6} lg={4} display="flex" alignItems="flex-end">
        <Box
          sx={{
            display: { xs: 'none', md: 'block', lg: 'flex' },
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          {children}
        </Box>
      </Grid>
    </Grid >
  )
}

Breadcrumb.propTypes = {
  subtitle: PropTypes.string,
  items: PropTypes.array,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Breadcrumb;

import React from 'react';
import { Box, Grid } from '@mui/material';
import {
  WelcomeCard,
  BlogCard,
  Earnings,
  MonthlySales,
  SalesOverview,
  TotalSales,
  ProductPerformance,
  WeeklyStats,
  DailyActivities,
} from './dashboard1-components';
import PageContainer from '../../components/container/PageContainer';
import Footer from '../../layouts/full-layout/footer/Footer';
import { useSelector } from 'react-redux';


const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Dashboard',
  },
];

const Dashboard1 = () => {

  return (
    // 2
    <Box sx={{ minHeight: '100%' }}>
      <PageContainer brdcrumsTitle="Dashboard" brdcrumsItems={BCrumb} title="Dashboard" description="this is Analytical Dashboard">
        <Grid p={0} m={0} container spacing={0}>
          {/* ------------------------- row 1 ------------------------- */}
          <Grid mb={3} item xs={12} lg={6}>
            <WelcomeCard />
            <Grid container spacing={0}>
              <Grid item xs={12} lg={6} sm={6}>
                <Earnings />
              </Grid>
              <Grid item xs={12} lg={6} sm={6}>
                <MonthlySales />
              </Grid>
            </Grid>
          </Grid>
          <Grid mb={3} item xs={12} lg={6}>
            <SalesOverview />
          </Grid>
          {/* ------------------------- row 2 ------------------------- */}
          <Grid mb={3} item xs={12} lg={4}>
            <TotalSales />
          </Grid>
          <Grid mb={3} item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          {/* ------------------------- row 3 ------------------------- */}
          <Grid mb={3} item xs={12} lg={4}>
            <BlogCard />
          </Grid>
          <Grid mb={3} item xs={12} lg={4}>
            <WeeklyStats />
          </Grid>
          <Grid mb={3} item xs={12} lg={4}>
            <DailyActivities />
          </Grid>
        </Grid>
      </PageContainer>


      <Footer />
    </Box>
  )
}
export default Dashboard1;

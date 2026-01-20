import React from 'react';
import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import TopCards from '../../components/dashboards/modern/TopCards';
import RevenueUpdates from '../../components/dashboards/modern/RevenueUpdates';
import WeeklyStats from '../../components/dashboards/modern/WeeklyStats';
import TopPerformers from '../../components/dashboards/modern/TopPerformers';
import Welcome from 'src/layouts/full/shared/welcome/Welcome';

const Modern = () => {
  const user = useSelector((state) => state.loginUserReducer?.user?.user);
  const isSuperAdmin = user?.role === 5;
  const isAdmin = user?.role === 4;

  return (
    <Box>
      <Grid container spacing={3}>
        {/* column */}
        <Grid item sm={12} lg={12}>
          <TopCards isSuperAdmin={isSuperAdmin || isAdmin} />
        </Grid>
        {/* column */}
        {(isSuperAdmin || isAdmin) && (
          <Grid item xs={12} lg={12}>
            <RevenueUpdates />
          </Grid>
        )}
        {/* column */}
        {/* column */}
        <Grid item xs={12} lg={4}>
          <WeeklyStats />
        </Grid>
        {/* column */}
        {/* <Grid item xs={12} lg={(isSuperAdmin || isAdmin) ? 8 : 12}>
          <TopPerformers />
        </Grid> */}
      </Grid>
      {/* column */}
      <Welcome />
    </Box>
  );
};

export default Modern;

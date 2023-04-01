import React, { Fragment } from 'react';
import { Box, Grid, MenuItem, Select, styled, useTheme } from '@mui/material';
import { MatxLoading } from '../../components';
import LineChart from '../charts/echarts/LineChart';
import useCredio from '../../hooks/useCredio';
// import StatCardsCredio from '../dashboard/shared/StatCardsCredio';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

const MerchantAnalytics = () => {
  const theme = useTheme();
  var { loaded, credio, getNewDashboard } = useCredio();
  // console.log("loaded -5- ",loaded, savings);
  if (loaded)
    return (
      <Fragment>
        <ContentBox className="analytics">
          <>
            <LineChart
              height="350px"
              isMerchant={false}
              data={credio.data}
              color={['#ff0000', '#0000ff', '#00ff00']}
            />
            {/* <AppEchart height={400} /> */}
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <CardHeader>
                <Title>Data Set</Title>
                <Select
                  size="small"
                  defaultValue="today"
                  onChange={(event) => {
                    console.log('here...... ');
                    credio = getNewDashboard(event.target.value);
                  }}
                >
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="last_week">Last Week</MenuItem>
                  <MenuItem value="this_month">This Month</MenuItem>
                  <MenuItem value="last_month">Last Month</MenuItem>
                  <MenuItem value="this_year">This Year</MenuItem>
                  <MenuItem value="all">All</MenuItem>
                </Select>
              </CardHeader>
              <H4></H4>

              {/* <StatCardsCredio data={credio.data} /> */}
            </Grid>
            {/* <AppIcon /> */}
          </>
        </ContentBox>
      </Fragment>
    );
  else return <MatxLoading />;
};

export default MerchantAnalytics;

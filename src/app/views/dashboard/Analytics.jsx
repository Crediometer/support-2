import { Card, Grid, MenuItem, Select, Box, styled } from '@mui/material';
import { Fragment, useState } from 'react';
import { MatxLoading } from '../../components';
import useCredio from '../../hooks/useCredio';
import DoughnutChart from './shared/Doughnut';
import RowCards from './shared/RowCards';
import StatCards from './shared/StatCards';
import TopSellingTable from './shared/TopSellingTable';
import DatePicker from "react-datepicker"; 
import '../credio/user/user.css' 
  
import "react-datepicker/dist/react-datepicker.css";  

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
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
 
const Analytics = () => {
  const [startDate, setStartDate] = useState(new Date()); 
  var { loaded, credio, getNewDashboard } = useCredio();
  console.log('loaded -- ', loaded);

  if (loaded)
  
    return (
      <Fragment>
        <ContentBox className="analytics">
          {' '}
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
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}  dateFormat="yyyy-MM-dd "  />  
              <MenuItem value="all">All</MenuItem>
            </Select>
          </CardHeader>
          <Grid container spacing={3}>
            {' '}
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <StatCards></StatCards>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Card sx={{ px: 3, py: 2, mb: 3 }}>
                <Title>New User Rates</Title>
                <SubTitle>All times</SubTitle>

                <DoughnutChart height="300px" />
              </Card>

              {/* <UpgradeCard />
            <Campaigns /> */}
              {/* <StatCards2 /> */}
            </Grid>
          </Grid>
        </ContentBox>
        {/* </DashboardProvider> */}
      </Fragment>
    );
  else return <MatxLoading></MatxLoading>;
};

export default Analytics;

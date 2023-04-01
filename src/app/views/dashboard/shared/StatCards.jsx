import { Box, Card, Grid, Icon, IconButton, styled, Tooltip} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Small } from '../../../components/Typography';
import useCredio from '../../../hooks/useCredio';
import useDashboard from '../../../hooks/useDashboard';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = (props) => {
  var { loaded, credio, getNewDashboard } = useCredio();
  console.log('lucifer --67 - ', credio.data.allUsers);
  var activated = 0;
  var frozen = 0;
  var incomplete = 0;
  // transactionType: 2

  if (loaded)
    credio.data.allUsers.map((e) => {
      if (!e.pinCode || !e.bvn) {
        incomplete++;
      }
      if (e.redFlag) {
        frozen++;
      }

      if (!e.redFlag && e.bvn && e.pinCode) {
        activated++;
      }
    });
  const cardList = [
    {
      name: 'New Users',
      color: 'action',
      path: '/new/users',
      path: '/analytics/credio/table/newUsers',
      amount: `${credio.data.newUsers.length}`,
      icon: 'group',
    },
    {
      name: 'Activated Users',
      amount: ` ${activated}`,
      icon: 'verified_user',
      path: '/analytics/credio/table/activatedUsers',
      color: 'success',
    },
    // { name: 'Inventory', amount: '-.-% Stock Surplus', icon: 'store' },
    {
      name: 'Incomplete KYC',
      path: '/analytics/credio/table/kyc',
      color: 'warning',
      amount: `${incomplete}`,
      icon: 'account_circle',
    },
    {
      name: 'Frozen account',
      path: '/analytics/credio/table/frozen',
      color: 'error',
      amount: `${frozen}`,
      icon: 'verified_user',
    },
    {
      name: 'All Users',
      color: 'primary',
      path: '/analytics/credio/table/allUsers',
      amount: `${credio.data.allUsers.length}`,
      icon: 'monetization_on',
    },
    {
      name: 'Freshwork desk',
      color: 'primary',
      externalLink: true,
      path: 'https://crediometer.freshchat.com',
      // amount: `₦ ${credio.data.allUsers.length}`,
      icon: 'call',
    },
    {
      name: 'Push All Notification to User',
      color: 'primary',
      externalLink: true,
      path: '',
      // amount: `₦ ${credio.data.allUsers.length}`,
      icon: 'notifications',
    },
  ];
  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon" color="error">
                {item.icon}
              </Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                {item.amount && <Heading>{item.amount}</Heading>}
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <IconButton
                onClick={() => {
                  if (item.externalLink) {
                    window.open(item.path, '_blank');
                  }
                }}
              >
                {item.externalLink ? (
                  <Icon>arrow_right_alt</Icon>
                ) : (
                  <NavLink to={item.path ?? '/'}>
                    <Icon>arrow_right_alt</Icon>
                  </NavLink>
                )}
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;

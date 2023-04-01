import React, { Fragment, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import './user.css';
import {
  Box,
  Grid,
  Avatar,
  Slide,
  Button,
  Snackbar,
  Menu,
  MenuItem,
  useTheme,
  TablePagination,
  Card,
  Icon,
  IconButton,
  styled,
  Tooltip,
} from '@mui/material';
import { MatxLoading } from '../../../components';
import { useNavigate, useParams } from 'react-router-dom';

import { H5, Small, Span } from '../../../components/Typography';
import { NavLink } from 'react-router-dom';

import useCredio from '../../../hooks/useCredio';

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

const StyledCard = styled(Card)(({ theme }) => ({
  // display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const StyledCardTop = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: '24px !important',
  background: '#F1F5F9',
  [theme.breakpoints.down('sm')]: {
    padding: '16px !important',
  },
}));

const ContentBox1 = styled(Box)(({ theme }) => ({
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

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}
const CredioAnalytics = () => {
  const theme = useTheme();
  const history = useNavigate();
  const [page, setPage] = useState(0);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  let { phoneNumber } = useParams();
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //

  const [openSnack, setOpenSnack] = useState(false);

  //
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const [rowsPerPage, setRowsPerPage] = useState(10);

  var { loaded, credio, getTransactions, loadedTranx, transactions, changeStatus } = useCredio();
  const handleCloseMenu = (redFlag) => {
    setAnchorEl(null);
    console.log('redFlag --- ', redFlag);
    changeStatus(redFlag, phoneNumber);
  };

  useEffect(() => {
    getTransactions(phoneNumber);
  }, []);
  console.log('Startup  succeed');
  if (loaded) {
    var userData = credio.data.allUsers.filter((e) => e.phoneNumber == phoneNumber)[0];
   
    // [0];
    return (
      <Fragment>
        <ContentBox className="analytics">
          <>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <StyledCardTop sx={{ mt: 5 }} elevation={6}>
                <ContentBox1>
                  <Avatar src={userData.profilePicture} />
                  <Box ml="12px">
                    <Heading>{'Welcome,'}</Heading>
                    <Small>{(userData.businessName ?? '').toUpperCase()}</Small>
                  </Box>
                </ContentBox1>
                <img src={'https://online.safehavenmfb.com/assets/images/building.svg'} />
              </StyledCardTop>
            </Grid>
            <Grid container lg={12} md={12} sm={12} xs={12}>
              {/* <Grid item lg={4} md={12} sm={12} sx={{ mt: 5, px: 2 }} xs={12}>
                <StyledCard elevation={6}>
                  <ContentBox1>
                    <Icon className="icon">attach_money</Icon>
                    <Box ml="12px">
                      <Heading>Available Balance</Heading>
                      <ContentBox1>
                        <H5>₦ {userData.vaults.accountBalance ?? 0}</H5>
                        <Tooltip title="View Details" placement="top">
                          <IconButton>
                            <Icon>visibility</Icon>
                          </IconButton>
                        </Tooltip>
                      </ContentBox1>
                    </Box>
                  </ContentBox1>
                </StyledCard>
              </Grid> */}
              <Grid item lg={4} md={12} sx={{ mt: 5, px: 2 }} sm={12} xs={12}>
                <StyledCard elevation={6}>
                  <ContentBox1>
                    {/* <Icon className="icon">attach_money</Icon> */}

                    <Box ml="12px">
                      <Heading>{userData.vaults.accountName ?? ''}</Heading>

                      <ContentBox1>
                        <H5>{userData.vaults.accountNumber ?? '************'}</H5>
                        <Tooltip title="View Details" placement="top">
                          <IconButton
                            onClick={() => {
                              copyTextToClipboard(userData.vaults.accountNumber ?? '************');
                            }}
                          >
                            <Icon>content_copy</Icon>
                          </IconButton>
                        </Tooltip>
                      </ContentBox1>
                    </Box>
                  </ContentBox1>

                  {/**/}
                </StyledCard>
              </Grid>
              <Grid item lg={4} sx={{ mt: 5, px: 2 }} md={12} sm={12} xs={12}>
                <StyledCard elevation={6}>
                  <ContentBox1>
                    <Box
                      ml="12px"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                    >
                      <Heading>{'Account Status'}</Heading>
                      <Box
                        className={
                          !userData.bvn || !userData.pinCode
                            ? 'tag yellow'
                            : userData.redFlag
                            ? 'tag red'
                            : 'tag green'
                        }
                        mt="20px"
                      >
                        {!userData.bvn || !userData.pinCode
                          ? 'Incomplete'
                          : userData.redFlag
                          ? 'Frozen'
                          : 'Active'}
                      </Box>
                    </Box>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={() => handleCloseMenu(userData.redFlag)}>
                        {userData.redFlag ? 'Activate Account' : 'Freeze Account'}
                      </MenuItem>
                    </Menu>
                  </ContentBox1>
                </StyledCard>
              </Grid>
                
                <Grid item lg={4} sx={{ mt: 5, px: 2 }} md={12} sm={12} xs={12}>
                  {/* <NavLink to={`/analytics/credio/table/note/${userData.phoneNumber}`}>   */}
                  <StyledCard elevation={6}
                   onClick={() => {
                    history(`/analytics/credio/table/note/${userData.phoneNumber}`);
                  }}
                  >
                    <ContentBox1>
                      <Box
                        ml="12px"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                      >
                        <Heading>{'User Notes'}</Heading>
                        <Box
                          className={
                            !userData.bvn || !userData.pinCode
                              ? 'tag yellow'
                              : userData.redFlag
                              ? 'tag red'
                              : 'tag green'
                          }
                          mt="20px"
                        >
                          {!userData.bvn || !userData.pinCode
                            ? 'Incomplete'
                            : userData.redFlag
                            ? 'Frozen'
                            : 'Active'}
                        </Box>
                      </Box>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <MenuItem onClick={() => handleCloseMenu(userData.redFlag)}>
                          {userData.redFlag ? 'Activate Account' : 'Freeze Account'}
                        </MenuItem>
                      </Menu>
                    </ContentBox1>
                  </StyledCard>
                  {/* </NavLink> */}
                </Grid>
            </Grid>
            {/* </Grid> */}
            <Grid item lg={12} sx={{ mt: 3 }} md={12} sm={12} xs={12}>
              <StyledCard elevation={6}>
                {/* <ContentBox1> */}
                {/* <Icon className="icon">attach_money</Icon> */}
                <Box ml="12px">
                  <Heading>{'Transaction History'}</Heading>
                  <Box mb="12px"></Box>
                  {loadedTranx &&
                    transactions
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((subscriber, index) => (
                        <div class="transaction-item " key={index}>
                          <div class="status">
                            <img
                              src={
                                subscriber.type == 1
                                  ? 'https://online.safehavenmfb.com/assets/images/transfered.svg'
                                  : 'https://online.safehavenmfb.com/assets/images/received.svg'
                              }
                              class=""
                            />
                          </div>
                          <div class="details">
                            <div class="half-width">
                              <p class="item-heading ">
                                {subscriber.narration}
                                {/* {subscriber.type == 1 ? 'Transfered to' : 'Recieved from'}
                                {subscriber.mode == 0 ? '***95902' : '***95902'}({subscriber.from}) */}
                              </p>
                              <p class="item-time">{subscriber.createdAt} </p>
                            </div>
                            <div class="right onequarter-width">
                              <p
                                class={
                                  subscriber.mode == 1
                                    ? getSuccessful(subscriber.referenceData)
                                      ? 'tag green'
                                      : 'tag red '
                                    : subscriber.referenceData.status == 'Created'
                                    ? 'tag red'
                                    : 'tag green'
                                }
                              >
                                {subscriber.mode == 0
                                  ? subscriber.referenceData.status
                                  : getSuccessful(subscriber.referenceData)}{' '}
                              </p>
                              <p class="amount">
                                {subscriber.type == 0 ? '+' : '-'}₦ {subscriber.amount}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  {!loadedTranx && <MatxLoading></MatxLoading>}
                </Box>
                <TablePagination
                  sx={{ px: 2 }}
                  page={page}
                  component="div"
                  rowsPerPage={rowsPerPage}
                  count={loadedTranx ? transactions.length : 0}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={[10, 25, 50]}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                  backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                />
              </StyledCard>
            </Grid>
          </>
        </ContentBox>
      </Fragment>
    );
  } else return <MatxLoading />;
};
function getSuccessful(result) {
  return result.f39 == '00' || result.f39 == 10 || result.f39 == 11 || result.f39 == 16;
}
async function copyTextToClipboard(text) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}

export default CredioAnalytics;

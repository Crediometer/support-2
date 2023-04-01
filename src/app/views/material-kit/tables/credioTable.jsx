import {
  Box,
  styled,
  Grid,
  Table,
  Card,
  Avatar,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TextField,
  TableRow,
} from '@mui/material';

import { format } from 'date-fns';
import '../../credio/user/user.css';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MatxLoading, SimpleCard } from '../../../components';
import useCredio from '../../../hooks/useCredio';
import './styles/transactions.css';
const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));
const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
  },
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
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const TransactionDetails = () => {
  const history = useNavigate();

  var [searching, setSearching] = useState('');
  const [page, setPage] = useState(0);
  const { loaded, credio } = useCredio();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  let { type } = useParams();

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  var tranxData = [];
  var filteredTranxData = [];
  var tranx = 0;
  const handleTextSearch = (e) => {
    setSearching(e.target.value.toLowerCase());
    console.log('searching ', searching, ' consolences ', e.target.value);
  };

  var loadedFunc = () => {
    if (type === 'kyc') {
      header = 'Incomplete KYC';

      tranxData = credio.data.allUsers.filter((e) => !e.bvn || !e.pinCode);
    } else if (type === 'newUsers') {
      header = 'New users';
      tranxData = credio.data.newUsers;
    } else if (type === 'activatedUsers') {
      header = 'Activated Users';
      tranxData = credio.data.allUsers.filter((e) => !e.redFlag && e.bvn && e.pinCode);
    } else if (type === 'frozen') {
      header = 'Frozen Accounts';
      tranxData = credio.data.allUsers.filter((tranx) => tranx.redFlag);
    } else if (type === 'allUsers') {
      header = 'All Users';
      tranxData = credio.data.allUsers;
    } else if (type === 'savings') {
      header = 'All Savings';
      tranxData = credio.data.transaction;
    } else if (type === 'deposit') {
      header = type;
      tranx = 1;
      tranxData = credio.data.transaction.filter((tranx) => tranx.type === 0);
    } else if (type === 'withdrawals') {
      header = type;
      tranx = 1;
      tranxData = credio.data.transaction.filter((tranx) => tranx.type === 1);
    }
    filteredTranxData = tranxData;
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  var header = '';
  if (loaded) {
    loadedFunc();

    return (
      <Container>
        <SimpleCard
          title={`${header}`.toUpperCase()}
          showIconWidget={true}
          iconWidget={
            <TextField
              type="search"
              id="search"
              label="Search"
              onBlur={handleTextSearch}
              onChange={handleTextSearch}
              sx={{ width: 400 }}
            />
          }
          showIcon={false}
          icon="add"
        >
          <Box width="100%" overflow="auto">
            {tranx === 0 ? (
              <StyledTable>
                <TableHead>
                  {/* */}

                  <TableRow>
                    <TableCell align="left">Profile Picture</TableCell>
                    <TableCell align="left">Business Name</TableCell>
                    <TableCell align="center">Phone Number</TableCell>
                    <TableCell align="center">Account Number</TableCell>
                    <TableCell align="center">Join Date</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tranxData
                    .filter((e) =>
                      searching.length == 0
                        ? true
                        : e.businessName.toLowerCase().includes(searching) ||
                          e.vaults.accountNumber.toLowerCase().includes(searching) ||
                          e.phoneNumber.toLowerCase().includes(searching)
                    )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((subscriber, index) => (
                      <TableRow
                        key={index}
                        onClick={() => {
                          history(`/analytics/credio/user/${subscriber.phoneNumber}`);
                        }}
                      >
                        <TableCell align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                          <Avatar src={subscriber.profilePicture} />
                        </TableCell>
                        <TableCell align="center">{subscriber.businessName}</TableCell>
                        <TableCell align="center">{subscriber.phoneNumber}</TableCell>
                        <TableCell align="center">
                          {subscriber.vaults?.accountNumber ?? 'dgfdg'}
                        </TableCell>
                        <TableCell align="center">
                          {format(Date.parse(subscriber.createdAt), 'dd/mm/yyyy') ===
                          format(new Date(), 'dd/mm/yyyy')
                            ? 'Today'
                            : subscriber.createdAt.toString().substr(0, 10)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </StyledTable>
            ) : (
              <Grid item lg={12} sx={{ mt: 3 }} md={12} sm={12} xs={12}>
                <Box mb="12px"></Box>
                <>
                  {tranxData
                    .filter((e) =>
                      searching.length == 0
                        ? true
                        : e.businessName.toLowerCase().includes(searching) ||
                          e.vaults.accountNumber.toLowerCase().includes(searching) ||
                          e.phoneNumber.toLowerCase().includes(searching)
                    )
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
                              {subscriber.from}
                              {/* {subscriber.type == 1 ? 'Transfered to' : 'Recieved from'}
                                {subscriber.mode == 0 ? '***95902' : '***95902'}({subscriber.from}) */}
                            </p>
                            <p class="item-time">{formatDate(new Date(subscriber.createdAt))} </p>
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
                </>
              </Grid>
            )}

            <TablePagination
              sx={{ px: 2 }}
              page={page}
              component="div"
              rowsPerPage={rowsPerPage}
              count={tranxData.length}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[10, 20, 35]}
              onRowsPerPageChange={handleChangeRowsPerPage}
              nextIconButtonProps={{ 'aria-label': 'Next Page' }}
              backIconButtonProps={{ 'aria-label': 'Previous Page' }}
            />
          </Box>
        </SimpleCard>
      </Container>
    );
  } else return <MatxLoading></MatxLoading>;
};

function getTranx(phoneNumber, data) {
  var sum = 0;
  data.transaction.map((items) => {
    if (items.from === phoneNumber || items.to === phoneNumber) {
      sum += items.amount;
    }
  });

  return sum;
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join(
      '-'
    ) +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

// 👇️ 2023-01-04 10:00:07
console.log(formatDate(new Date()));

//  👇️️ 2025-05-04 05:24:07
console.log(formatDate(new Date('May 04, 2025 05:24:07')));
function getSuccessful(result) {
  return result.f39 == '00' || result.f39 == 10 || result.f39 == 11 || result.f39 == 16;
}
export default TransactionDetails;

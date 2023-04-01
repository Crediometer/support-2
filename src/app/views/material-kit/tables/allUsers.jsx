import {
  Box,
  Icon,
  IconButton,
  styled,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import { MatxLoading } from '../../../components';
import useDashboard from '../../../hooks/useDashboard';

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
  },
}));

const AllUsers = () => {
  const [page, setPage] = useState(0);
  const { loaded, overviews } = useDashboard();
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  console.log('overviews  ', overviews);
  if (loaded)
    return (
      <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="left">Picture</TableCell>
              <TableCell align="center">Business Name</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">Business Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {overviews.message.allUser
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((subscriber, index) => (
                <TableRow key={index}>
                  <TableCell align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                    <Avatar src={subscriber.profilePicture} />
                  </TableCell>
                  <TableCell align="center">{subscriber.businessName}</TableCell>
                  <TableCell align="center">{subscriber.phoneNumber}</TableCell>
                  <TableCell align="center">{subscriber.businessAddress ?? '-'}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </StyledTable>

        <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={overviews.message.allUser.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ 'aria-label': 'Next Page' }}
          backIconButtonProps={{ 'aria-label': 'Previous Page' }}
        />
      </Box>
    );
  else return <MatxLoading></MatxLoading>;
};

export default AllUsers;

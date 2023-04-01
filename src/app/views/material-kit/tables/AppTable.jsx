import { styled } from '@mui/material';
import { SimpleCard } from '../../../components';
import { DashboardProvider } from '../../../contexts/DashboardContext';
import PaginationTable from './PaginationTable';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const AppTable = () => {
  return (
    <Container>
      {/* <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Table" }]} />
      </Box> */}

      {/* <SimpleCard title="Users Table">
        <SimpleTable />
      </SimpleCard> */}
      <DashboardProvider>
        <SimpleCard title="New Users Table">
          <PaginationTable />
        </SimpleCard>
      </DashboardProvider>
    </Container>
  );
};

export default AppTable;

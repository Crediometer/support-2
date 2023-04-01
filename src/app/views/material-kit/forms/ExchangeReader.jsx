import { Stack } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from '../../../components';
import ExchangeForm from './ExchangeForm';
import StepperForm from './StepperForm';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const ExchangeReader = () => {
  return (
    <Container>
      <Stack spacing={3}>
        <SimpleCard title="Exchange Reader" showIcon={false}>
          <StepperForm />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default ExchangeReader;

import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Fab,
  Grid,
  Hidden,
  Icon,
  IconButton,
  styled,
  useTheme,
} from '@mui/material';
import { MatxLoading } from '../../../components'
import useDashboard from '../../../hooks/useDashboard';
import { Span } from '../../../components/Typography';
import { format } from 'date-fns';
import { Fragment } from 'react';

const ProjectName = styled(Span)(({ theme }) => ({
  marginLeft: 24,
  fontWeight: '500',
  [theme.breakpoints.down('sm')]: { marginLeft: 4 },
}));

const StarOutline = styled(Fab)(() => ({
  marginLeft: 0,
  boxShadow: 'none',
  background: '#08ad6c !important',
  backgroundColor: 'rgba(9, 182, 109, 1) !important',
}));

const DateRange = styled(Fab)(({ theme }) => ({
  marginLeft: 0,
  boxShadow: 'none',
  color: 'white !important',
  background: `${theme.palette.error.main} !important`,
}));

const StyledAvatar = styled(Avatar)(() => ({
  width: '32px !important',
  height: '32px !important',
}));

const RowCards = () => {
  const { palette } = useTheme();
  const {loaded, overviews} = useDashboard();
  const textMuted = palette.text.secondary;

  if(loaded)
  return overviews.message.projects.map((id,w) => (
    <Fragment key={w}>
      <Card sx={{ py: 1, px: 2 }} className="project-card">
        <Grid container alignItems="center">
          <Grid item md={7} xs={7}>
            <Box display="flex" alignItems="center">
              <Checkbox />
              <Hidden smDown>
                {w % 2 === 1 ? (
                  <StarOutline size="small">
                    <Icon>star_outline</Icon>
                  </StarOutline>
                ) : (
                  <DateRange size="small">
                    <Icon>date_range</Icon>
                  </DateRange>
                )}
              </Hidden>
              <ProjectName>{id.name}</ProjectName>
            </Box>
          </Grid>

          <Grid item md={2} xs={3}>
            <Box color={textMuted}>{id.ratioDone}%</Box>
          </Grid>
          <Grid item md={2} xs={4}>
            <Box color={textMuted}>{format(new Date().getTime(), 'MM/dd/yyyy')}</Box>
          </Grid>

          {/* <Hidden smDown>
            <Grid item xs={3}>
              <Box display="flex" position="relative" marginLeft="-0.875rem !important">
                <StyledAvatar src="/assets/images/face-4.jpg" />
                <StyledAvatar src="/assets/images/face-4.jpg" />
                <StyledAvatar src="/assets/images/face-4.jpg" />
                <StyledAvatar sx={{ fontSize: '14px' }}>+3</StyledAvatar>
              </Box>
            </Grid>
          </Hidden> */}

          <Grid item xs={1}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton>
                <Icon>more_vert</Icon>
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Card>
      <Box py={1} />
    </Fragment>
  ));
  else return <MatxLoading></MatxLoading>
};

export default RowCards;

import { Card, Icon, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import { Box, styled } from '@mui/system';
import { useState } from 'react';
import MatxSearchBox from '../components/MatxSearchBox';
// import { ChakraProvider } from "@chakra-ui/provider";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const CardRoot = styled(Card)(() => ({
  height: '100%',
  padding: '20px 24px',
}));

const CardTitle = styled('div')(({ subtitle }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  verticalAlign: 'center',
  textTransform: 'capitalize',
  marginBottom: !subtitle && '16px',
}));
const CardIcon = styled('div')(({ subtitle }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  float: 'right',
  textTransform: 'capitalize',
  marginBottom: !subtitle && '16px',
}));

const SimpleCard = ({
  children,
  title,
  subtitle,
  icon,
  iconAction,
  iconWidget,
  showIconWidget = true,
  showIcon = true,
}) => {
  const [open, setOpen] = useState(false);
  const theme = {
    // ... your system-ui theme
    config: {
      useSystemColorMode: false, // or true
      initialColorMode: 'light', // or "dark"
      cssVarPrefix: 'chakra', // any string
    },
  };

  // {
  //   selection: {
  //     startDate: [native Date Object],
  //     endDate: [native Date Object],
  //   }
  // }
  // }

  const selectionRange = {
    startDate: new Date(),
    endDate: Date.parse('25-12-2021'),
    key: 'selection',
  };
  const handleSelect = () => console.log('sjhv');
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <CardRoot elevation={6}>
      <CardTitle subtitle={subtitle}>
        {showIconWidget && <CardIcon>{iconWidget}</CardIcon>}
        {showIcon && (
          <CardIcon>
            {icon ? (
              <IconButton onClick={iconAction != undefined ? iconAction : function () {}}>
                <Icon fontSize="large">{icon}</Icon>
              </IconButton>
            ) : (
              <MatxSearchBox />
            )}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Use Google's location service?</DialogTitle>

              <DialogContent>
                THis is coming soon...
                {/* <ChakraProvider theme={theme}>
                                <DateRangePicker
                                    editableDateInputs={true}
                                    // onChange={item => setState([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    // ranges={state}
                                    // months={1}
                                    ranges={[selectionRange]}
                                    // onChange={this.handleSelect}
                                />
                            </ChakraProvider> */}
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Disagree
                </Button>

                <Button onClick={handleClose} color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </CardIcon>
        )}
        {title}
      </CardTitle>

      {subtitle && <Box sx={{ mb: 2 }}>{subtitle}</Box>}
      {children}
    </CardRoot>
  );
};

export default SimpleCard;

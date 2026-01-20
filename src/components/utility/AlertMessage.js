import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

const AlertMessage = ({ alertMessage, setAlertMessage }) => {
  const [open, setOpen] = React.useState(alertMessage.status);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    if (alertMessage.status) {
      setOpen(true);
      const timer = setTimeout(() => {
        setAlertMessage({ status: false, message: '', color: '' });
        setOpen(false);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [alertMessage, setAlertMessage]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={alertMessage.color}
        variant="filled"
        sx={{ width: '100%', color: 'white' }}
      >
        <AlertTitle>{alertMessage.message}</AlertTitle>
        {/* Easy to customize the Template!!! */}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;

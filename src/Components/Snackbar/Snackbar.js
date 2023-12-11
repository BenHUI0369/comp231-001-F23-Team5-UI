import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SimpleSnackbar({message, buttonName, showSnackbar}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (showSnackbar) {
      setOpen(true);
    }
  }, [showSnackbar]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        style={{
          borderRadius: '3px', 
          width: '60px',
          backgroundColor: '#3399FF'}}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
          {buttonName && (
        <button onClick={() => setOpen(true)}>{buttonName}</button>
      )}
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        message={message}
        action={action}
        ContentProps={{
             // Set the width of the Snackbar content
             style: {
              backgroundColor: 'grey', // Change background color
              color: 'white', // Change text color
              width: 'auto', // Set width
              borderRadius: '8px', // Add border radius
             }
          }}
      />
    </div>
  );
}

/* backup
export default function SimpleSnackbar({message, buttonName}) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        style={{
          borderRadius: '3px', 
          width: '60px',
          backgroundColor: '#3399FF'}}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <button onClick={handleClick}>{buttonName}</button>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        message={message}
        action={action}
        ContentProps={{
             // Set the width of the Snackbar content
             style: {
              backgroundColor: 'grey', // Change background color
              color: 'white', // Change text color
              width: 'auto', // Set width
              borderRadius: '8px', // Add border radius
             }
          }}
      />
    </div>
  );
}
*/
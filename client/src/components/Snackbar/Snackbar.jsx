import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, IconButton, Slide } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

import { setSnackbar } from '../../actions/snackbar';

import useStyles from './styles';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function CustomizedSnackbar() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const snackbarOpen = useSelector((state) => {
    return state.snackbar.snackbarOpen;
  });
  const snackbarType = useSelector((state) => {
    return state.snackbar.snackbarType;
  });
  const snackbarMessage = useSelector((state) => {
    return state.snackbar.snackbarMessage;
  });

  const handleClose = () => {
    dispatch(setSnackbar(false, snackbarType, snackbarMessage));
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarOpen}
        onClose={handleClose}
        autoHideDuration={6000}
        TransitionComponent={SlideTransition}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      >
        <Alert onClose={handleClose} variant="filled" severity={snackbarType}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomizedSnackbar;

import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Typography } from '@material-ui/core';

import { logout } from '../../actions/auth';

import useStyles from './styles';

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleOnLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <Button
        className={classes.buttonLogout}
        variant="text"
        color="primary"
        size="medium"
        type="button"
        onClick={handleOnLogoutClick}
        disableElevation={true}
      >
        <Typography variant="body1" color="primary">
          Logout
        </Typography>
      </Button>
    </>
  );
};

export default LogoutBtn;

import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography, CircularProgress } from '@material-ui/core';

import useStyles from './styles.js';

const FormLoading = () => {
  const classes = useStyles();

  const message = useSelector((state) => {
    return state.asyncLoading.msg;
  });

  return (
    <Paper className={`${classes.paper} ${classes.stickyForm}`}>
      <Typography className={classes.loadMsg} variant="h6" align="center">
        {message}
      </Typography>
      <CircularProgress />
    </Paper>
  );
};

export default FormLoading;

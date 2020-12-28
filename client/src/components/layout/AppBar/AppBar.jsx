import React from 'react';
import { AppBar, Typography } from '@material-ui/core';

import memories from '../../../images/memories.png';
import useStyles from './styles';

const AppHeader = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Typography className={classes.heading} variant="h2" align="center">
        Memories
      </Typography>
      <img className={classes.image} src={memories} alt="memories" height="60" />
    </AppBar>
  );
};

export default AppHeader;

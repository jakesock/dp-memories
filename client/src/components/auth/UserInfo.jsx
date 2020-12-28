import React from 'react';
import { Container, Typography } from '@material-ui/core';

import LogoutBtn from './LogoutBtn';

import useStyles from './styles';

const UserInfo = ({ username }) => {
  const classes = useStyles();
  return (
    <Container className={classes.userInfo}>
      <Typography variant="h6">{username}</Typography>
      <LogoutBtn />
    </Container>
  );
};

export default UserInfo;

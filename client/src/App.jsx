import React, { useState, useEffect } from 'react';

import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Button,
} from '@material-ui/core';

import memories from './images/memories.png';
import useStyles from './styles';

import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';
import PostForm from './components/Posts/PostForm/PostForm';
import Posts from './components/Posts/Posts';

import { useDispatch, useSelector } from 'react-redux';
import { loadUser, logout } from './actions/auth';
import { getPosts } from './actions/posts';

const App = () => {
  const [form, setForm] = useState('login');
  const [currentPostId, setCurrentPostId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => {
    return state.auth.isAuthenticated;
  });

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, isAuthenticated]);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const formToRender = () => {
    if (form === 'login' && !isAuthenticated) {
      return <LoginForm setForm={setForm} />;
    } else if (form === 'register' && !isAuthenticated) {
      return <RegisterForm setForm={setForm} />;
    } else if (isAuthenticated) {
      return (
        <PostForm
          setForm={setForm}
          currentPostId={currentPostId}
          setCurrentPostId={setCurrentPostId}
        />
      );
    }
  };

  const handleOnLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <Container maxwidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
        {isAuthenticated ? (
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="small"
            type="button"
            onClick={handleOnLogoutClick}
          >
            Logout
          </Button>
        ) : null}
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            className={classes.mainContainer}
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item sm={12} md={7}>
              <Posts setCurrentPostId={setCurrentPostId} />
            </Grid>
            <Grid item sm={12} md={4}>
              {formToRender()}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;

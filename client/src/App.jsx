import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import { loadUser } from './actions/auth';
import { getPosts } from './actions/posts';

import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import PostForm from './components/Posts/PostForm/PostForm';
import Posts from './components/Posts/Posts';
import Snackbar from './components/Snackbar/Snackbar';
import BackToTop from './components/BackToTop/BackToTop';

import memories from './images/memories.png';
import useStyles from './styles';

const App = () => {
  const [form, setForm] = useState('login');
  const [currentPostId, setCurrentPostId] = useState(null);

  const dispatch = useDispatch();
  const classes = useStyles();

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

  return (
    <Container maxwidth="lg">
      <Snackbar />

      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
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
            <Grid item xs={12} sm={12} md={7}>
              <Posts setCurrentPostId={setCurrentPostId} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              {formToRender()}
              <BackToTop showBelow={250} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;

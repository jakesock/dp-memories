import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grow, Grid } from '@material-ui/core';

import { loadUser } from '../actions/auth';
import { getPosts } from '../actions/posts';

import AppBar from './layout/AppBar/AppBar';
import BackToTop from './layout/BackToTop/BackToTop';
import Snackbar from './layout/Snackbar/Snackbar';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import PostForm from './auth/PostForm';
import Posts from './Posts/Posts';

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
      <AppBar />
      <Snackbar />
      <BackToTop showBelow={102} />
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
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;

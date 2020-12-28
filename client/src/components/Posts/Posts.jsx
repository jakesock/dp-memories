import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from './Post/Post';

import useStyles from './styles';

const Posts = ({ setCurrentPostId }) => {
  const posts = useSelector((state) => {
    return state.posts.posts;
  });
  const postsLoading = useSelector((state) => {
    return state.posts.loading;
  });
  const currentUser = useSelector((state) => {
    return state.auth.user;
  });

  const classes = useStyles();

  return postsLoading ? (
    <CircularProgress />
  ) : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6}>
          <Post
            post={post}
            setCurrentPostId={setCurrentPostId}
            currentUser={currentUser}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;

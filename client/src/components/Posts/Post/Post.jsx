import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

import { deletePost, likePost } from '../../../actions/posts';
import { setSnackbar } from '../../../actions/snackbar';

import PostDropdown from './PostDropdown';

import useStyles from './styles';

const Post = ({ post, setCurrentPostId, currentUser }) => {
  const [isLiked, setIsLiked] = useState(null);

  const dispatch = useDispatch();
  const classes = useStyles();

  const isAuthenticated = useSelector((state) => {
    return state.auth.isAuthenticated;
  });

  const handleLike = () => {
    if (isAuthenticated) {
      dispatch(likePost(post._id));
    } else {
      dispatch(setSnackbar(true, 'info', 'Please login or register to like posts!'));
    }
  };

  useEffect(() => {
    const checkIfLiked = () => {
      if (isAuthenticated) {
        const postIsLiked = post.likes.includes(currentUser._id);
        postIsLiked ? setIsLiked(true) : setIsLiked(false);
      } else {
        setIsLiked(false);
      }
    };

    checkIfLiked();
  });

  const handleEdit = () => {
    setCurrentPostId(post._id);
  };

  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile.url}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator.username}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        {currentUser && post.creator._id === currentUser._id ? (
          <PostDropdown handleDelete={handleDelete} handleEdit={handleEdit} />
        ) : null}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags[0] !== ''
            ? post.tags.map((tag) => `#${tag} `)
            : '#dinosaurplanet'}
        </Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {isLiked ? (
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleLike}
            disableElevation
          >
            <ThumbUpAltIcon fontSize="small" />
            &nbsp;Liked&nbsp;{post.likeCount}
          </Button>
        ) : (
          <Button size="small" color="primary" onClick={handleLike}>
            <ThumbUpAltIcon fontSize="small" />
            &nbsp;Like&nbsp;{post.likeCount}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;

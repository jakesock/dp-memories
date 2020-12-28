import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { Button, Typography, Paper } from '@material-ui/core';

import FormHeader from '../../layout/FormHeader/FormHeader';
import UserInfo from '../../auth/UserInfo';
import FormInput from '../../auth/layout/FormInput';

import { createPost, updatePost } from '../../../actions/posts';
import { clearErrors } from '../../../actions/error';

import usePrevious from '../../../hooks/usePrevious';
import useStyles from './styles';

const PostForm = ({ setForm, currentPostId, setCurrentPostId }) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });
  const [errorMsg, setErrorMsg] = useState(null);

  const user = useSelector((state) => {
    return state.auth.user;
  });
  const isAuthenticated = useSelector((state) => {
    return state.auth.isAuthenticated;
  });

  const post = useSelector((state) => {
    return currentPostId
      ? state.posts.posts.find((post) => post._id === currentPostId)
      : null;
  });

  const error = useSelector((state) => {
    return state.error;
  });
  const prevError = usePrevious(error);

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (error !== prevError) {
      if (error.id === 'CREATE_POST_FAIL' || error.id === 'UPDATE_POST_FAIL') {
        setErrorMsg(error.msg.msg);
      } else {
        setErrorMsg(null);
      }
    }
  }, [error, prevError]);

  useEffect(() => {
    if (!isAuthenticated) {
      setForm('login');
    }
  });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      if (currentPostId) {
        dispatch(updatePost(currentPostId, postData));
      } else {
        dispatch(createPost(postData));
      }
      dispatch(clearErrors());
      clear();
    } else {
      setForm('login');
    }
  };

  const onChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const clear = () => {
    dispatch(clearErrors());
    setCurrentPostId(null);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <FormHeader
          title={currentPostId ? 'Updating a Memory' : 'Creating a Memory'}
          errorMsg={errorMsg}
        />
        {isAuthenticated ? <UserInfo username={user.username} /> : null}
        <FormInput
          label="Title"
          name="title"
          id="title"
          inputType="text"
          formData={postData}
          onChange={onChange}
        />
        <FormInput
          label="Message"
          name="message"
          id="message"
          inputType="text"
          formData={postData}
          onChange={onChange}
        />
        <FormInput
          label="Tags"
          name="tags"
          id="tags"
          inputType="text"
          formData={postData}
          onChange={(e) =>
            setPostData({
              ...postData,
              tags: e.target.value.split(','),
            })
          }
        />
        <Typography variant="caption" color="textSecondary" align="center">
          Comma-seperated (i.e. thanksgiving, gobblegobble)
        </Typography>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default PostForm;

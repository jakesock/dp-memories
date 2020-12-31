import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Paper } from '@material-ui/core';

import FormHeader from './layout/FormHeader/FormHeader';
import UserInfo from './layout/UserInfo/UserInfo';
import FormInput from './layout/FormInput';
import FormLoading from './layout/FormLoading/FormLoading';

import { createPost, updatePost } from '../../actions/posts';
import { clearErrors } from '../../actions/error';

import usePrevious from '../../hooks/usePrevious';
import useStyles from './styles';

const PostForm = ({ setForm, currentPostId, setCurrentPostId }) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  const [errorMsg, setErrorMsg] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [inputError, setInputError] = useState({});

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
  const isAsyncLoading = useSelector((state) => {
    return state.asyncLoading.formLoading;
  });

  const prevError = usePrevious(error);
  const prevPostData = usePrevious(postData);

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
    if (post) {
      setInputError({});
      setPostData(post);
      setPreviewImage(post.selectedFile.url);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAuthenticated) {
      if (validate()) {
        if (currentPostId) {
          dispatch(updatePost(currentPostId, postData));
        } else {
          dispatch(createPost(postData));
        }

        if ((!errorMsg || prevPostData !== postData) && !isAsyncLoading) {
          dispatch(clearErrors());
          clear();
        }
      }
    } else {
      setForm('login');
    }
  };

  const handleInputChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
    validate({ [e.target.name]: e.target.value });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPostData({ ...postData, selectedFile: reader.result });
        setPreviewImage(reader.result);
      };
    }
  };

  const validate = (fieldValues = postData) => {
    let temp = { ...inputError };
    if ('title' in fieldValues)
      temp.title = fieldValues.title ? '' : 'Title is required!';
    if ('message' in fieldValues)
      temp.message = fieldValues.message ? '' : 'Message is required!';

    setInputError({
      ...temp,
    });
    if (fieldValues === postData)
      return Object.values(temp).every((value) => value === '');
  };

  const clear = () => {
    dispatch(clearErrors());
    setCurrentPostId(null);
    setPreviewImage(null);
    setInputError({});
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };

  return isAsyncLoading ? (
    <FormLoading />
  ) : (
    <Paper className={`${classes.paper} ${classes.stickyForm}`}>
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
          onChange={handleInputChange}
          error={inputError.title}
        />
        <FormInput
          label="Message"
          name="message"
          id="message"
          inputType="text"
          formData={postData}
          onChange={handleInputChange}
          error={inputError.message}
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
          helperText="Comma-seperated (i.e. thanksgiving, gobblegobble)"
        />
        <FormInput
          name="selectedFile"
          id="selectedFile"
          inputType="file"
          formData={postData}
          onChange={handleFileInputChange}
          {...(currentPostId && { currentPost: true })}
        />
        <div className={classes.imageContainer}>
          {postData.selectedFile !== '' && (
            <img className={classes.chosenImage} src={previewImage} alt="chosen" />
          )}
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

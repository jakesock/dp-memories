import * as api from '../api';
import { tokenConfig } from './auth';
import { returnErrors } from './error';
import { setSnackbar } from './snackbar';

import {
  CREATE_POST,
  FETCH_POSTS,
  POSTS_LOADING,
  UPDATE_POST,
  LIKE_POST,
  DELETE_POST,
} from '../constants/actionTypes';

export const getPosts = () => async (dispatch) => {
  try {
    dispatch(setPostsLoading());

    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_POSTS, payload: data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch(setSnackbar(true, 'error', err.response.data));
  }
};

export const createPost = (post) => async (dispatch, getState) => {
  try {
    const { data } = await api.createPost(post, tokenConfig(getState));
    dispatch({ type: CREATE_POST, payload: data });
    dispatch(setSnackbar(true, 'success', 'Memory created!'));
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, 'CREATE_POST_FAIL'),
    );
  }
};

export const updatePost = (id, post) => async (dispatch, getState) => {
  try {
    const { data } = await api.updatePost(id, post, tokenConfig(getState));
    dispatch({ type: UPDATE_POST, payload: data });
    dispatch(setSnackbar(true, 'success', 'Memory updated!'));
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, 'UPDATE_POST_FAIL'),
    );
  }
};

export const likePost = (id) => async (dispatch, getState) => {
  try {
    const { data } = await api.likePost(id, tokenConfig(getState));
    dispatch({ type: LIKE_POST, payload: data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const deletePost = (id) => async (dispatch, getState) => {
  try {
    await api.deletePost(id, tokenConfig(getState));
    dispatch({ type: DELETE_POST, payload: id });
    dispatch(setSnackbar(true, 'success', 'Memory deleted!'));
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch(setSnackbar(true, 'error', err.response.data));
  }
};

export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING,
  };
};

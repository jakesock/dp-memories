import * as api from '../api';

import {
  CREATE_POST,
  FETCH_POSTS,
  POSTS_LOADING,
  UPDATE_POST,
  LIKE_POST,
  DELETE_POST,
} from '../constants/actionTypes';
import { tokenConfig } from './auth';
import { returnErrors } from './error';

export const getPosts = () => async (dispatch) => {
  try {
    dispatch(setPostsLoading());

    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_POSTS, payload: data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const createPost = (post) => async (dispatch, getState) => {
  try {
    console.log(tokenConfig(getState));
    const { data } = await api.createPost(post, tokenConfig(getState));

    dispatch({ type: CREATE_POST, payload: data });
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
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, 'UPDATE_POST_FAIL'),
    );
  }
};

export const likePost = (id) => async (dispatch, getState) => {
  try {
    console.log(tokenConfig(getState));

    const { data } = await api.likePost(id, tokenConfig(getState));
    console.log(data);
    dispatch({ type: LIKE_POST, payload: data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const deletePost = (id) => async (dispatch, getState) => {
  try {
    await api.deletePost(id, tokenConfig(getState));

    dispatch({ type: DELETE_POST, payload: id });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING,
  };
};

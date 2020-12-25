import axios from 'axios';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../constants/actionTypes';

import { returnErrors } from './error';

export const loadUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LOADING });

    const { data } = await axios.get('/users', tokenConfig(getState));
    dispatch({ type: USER_LOADED, payload: data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = ({ username, password, passwordCheck }) => async (
  dispatch,
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ username, password, passwordCheck });
    const { data } = await axios.post('/users/register', body, config);

    dispatch({ type: REGISTER_SUCCESS, payload: data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
    dispatch({ type: REGISTER_FAIL });
  }
};

export const login = ({ username, password }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ username, password });
    const { data } = await axios.post('/users/login', body, config);

    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
};

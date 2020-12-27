import * as api from '../api';
import { returnErrors } from './error';
import { setSnackbar } from './snackbar';

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

// Action Creators
export const loadUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LOADING });

    const { data } = await api.getUserData(tokenConfig(getState));
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

    const { data } = await api.registerUser(body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: data });
    dispatch(setSnackbar(true, 'success', 'Successfully registered and logged in!'));
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

    const { data } = await api.loginUser(body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    dispatch(setSnackbar(true, 'success', 'Successfully logged in!'));
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => (dispatch) => {
  try {
    dispatch({ type: LOGOUT_SUCCESS });
    dispatch(setSnackbar(true, 'success', 'Successfully logged out!'));
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
    dispatch(setSnackbar(true, 'error', err.response.data));
  }
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

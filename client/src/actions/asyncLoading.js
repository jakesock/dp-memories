import { SET_LOADING, DONE_LOADING } from '../constants/actionTypes';

export const setLoading = (msg) => {
  return {
    type: SET_LOADING,
    payload: msg,
  };
};

export const doneLoading = () => {
  return {
    type: DONE_LOADING,
  };
};

import { SET_SNACKBAR } from '../constants/actionTypes';

export const setSnackbar = (
  snackbarOpen,
  snackbarType = 'success',
  snackbarMessage = '',
) => {
  return {
    type: SET_SNACKBAR,
    payload: {
      snackbarOpen,
      snackbarType,
      snackbarMessage,
    },
  };
};

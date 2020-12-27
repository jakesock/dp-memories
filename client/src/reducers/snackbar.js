import { SET_SNACKBAR } from '../constants/actionTypes';

const initialState = {
  snackbarOpen: false,
  snackbarType: 'success',
  snackbarMessage: '',
};

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SNACKBAR:
      const { snackbarOpen, snackbarMessage, snackbarType } = action.payload;
      return {
        ...state,
        snackbarOpen,
        snackbarType,
        snackbarMessage,
      };
    default:
      return state;
  }
};

export default snackbarReducer;

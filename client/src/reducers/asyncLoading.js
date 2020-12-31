import { SET_LOADING, DONE_LOADING } from '../constants/actionTypes';

const intitialState = {
  formLoading: false,
  msg: '',
};

const asyncLoadingReducer = (state = intitialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        formLoading: true,
        msg: action.payload,
      };
    case DONE_LOADING:
      return {
        ...state,
        formLoading: false,
        msg: '',
      };
    default:
      return state;
  }
};

export default asyncLoadingReducer;

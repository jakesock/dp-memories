import {
  CREATE_POST,
  FETCH_POSTS,
  UPDATE_POST,
  LIKE_POST,
  DELETE_POST,
  POSTS_LOADING,
} from '../constants/actionTypes';

const initialState = {
  posts: [],
  loading: false,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case FETCH_POSTS:
      return { ...state, posts: action.payload, loading: false };
    case UPDATE_POST:
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post,
        ),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case POSTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default postsReducer;

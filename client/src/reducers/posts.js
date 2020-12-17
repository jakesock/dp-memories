import {
  CREATE_POST,
  FETCH_POSTS,
  UPDATE_POST,
  LIKE_POST,
  DELETE_POST,
} from '../constants/actionTypes';

const postsReducer = (posts = [], action) => {
  switch (action.type) {
    case CREATE_POST:
      return [...posts, action.payload];
    case FETCH_POSTS:
      return action.payload;
    case UPDATE_POST:
    case LIKE_POST:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post,
      );
    case DELETE_POST:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};

export default postsReducer;

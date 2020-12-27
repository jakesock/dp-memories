import { combineReducers } from 'redux';

import auth from './auth';
import error from './error';
import posts from './posts';
import snackbar from './snackbar';

export default combineReducers({ auth, error, posts, snackbar });

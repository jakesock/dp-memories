import { combineReducers } from 'redux';

import auth from './auth';
import error from './error';
import posts from './posts';
import snackbar from './snackbar';
import asyncLoading from './asyncLoading';

export default combineReducers({ asyncLoading, auth, error, posts, snackbar });

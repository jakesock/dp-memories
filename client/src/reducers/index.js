import { combineReducers } from 'redux';

import auth from './auth';
import error from './error';
import posts from './posts';

export default combineReducers({ auth, error, posts });

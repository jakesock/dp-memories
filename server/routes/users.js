import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';
import {
  registerUser,
  loginUser,
  getUserData,
  isUsernameTaken,
} from '../controllers/users.js';

router.get('/', auth, getUserData);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/isUsernameTaken', isUsernameTaken);

export default router;

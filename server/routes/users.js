import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';
import { registerUser, loginUser, getUserData } from '../controllers/users.js';

router.get('/', auth, getUserData);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;

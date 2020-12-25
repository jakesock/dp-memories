import express from 'express';

import auth from '../middleware/auth.js';
import { registerUser, loginUser, getUserData } from '../controllers/users.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', auth, getUserData);

export default router;

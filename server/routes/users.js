import express from 'express';

import auth from '../middleware/auth.js';
import { registerUser, loginUser, tokenIsValid } from '../controllers/users.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/tokenIsValid', tokenIsValid);

export default router;

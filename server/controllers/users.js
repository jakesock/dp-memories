import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const registerUser = async (req, res) => {
  try {
    const { username, password, passwordCheck } = req.body;

    // Validate
    if (!username || !password || !passwordCheck)
      return res.status(400).json({ msg: 'Not all fields have been entered!' });
    if (password !== passwordCheck)
      return res.status(400).json({ msg: 'Passwords do not match!' });

    const existingUsername = await User.findOne({ username });

    if (existingUsername) return res.status(400).json({ msg: 'Username is taken!' });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate
    if (!username || !password)
      return res.status(400).json({ msg: 'Not all fields have been entered' });

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(400).json({ msg: 'No account with this username exists!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid password!' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserData = async (req, res) => {
  const user = await User.findById(req.user).select('-password');
  res.json(user);
};

export const tokenIsValid = async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

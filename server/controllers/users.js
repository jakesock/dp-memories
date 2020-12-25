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

    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24 * 2,
    });

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

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate
    if (!username || !password)
      return res.status(400).json({ msg: 'Not all fields have been entered!' });

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ msg: 'No account with this username exists!' });
    }

    const passwordIsMatch = await bcrypt.compare(password, user.password);
    if (!passwordIsMatch) return res.status(400).json({ msg: 'Invalid password!' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24 * 2,
    });

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
  try {
    const { id } = req.user;
    const user = await User.findById(id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

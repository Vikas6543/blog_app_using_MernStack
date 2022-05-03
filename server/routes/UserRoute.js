const express = require('express');
const generateAuthToken = require('../utils/generateToken');
const User = require('../models/userModel');
const router = express.Router();

// register a user
router.post('/register', async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).json({
      message: 'Please enter all fields',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    const newUser = new User({
      userName,
      email,
      password,
    });

    await newUser.save();

    // generate token
    const token = generateAuthToken(newUser._id);
    newUser.token = token;

    return res.status(201).json({
      message: 'User created successfully',
      user: newUser,
      token: generateAuthToken(newUser._id),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'Please enter all fields',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist',
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Incorrect password',
      });
    }

    return res.status(200).json({
      message: 'User logged in successfully',
      user,
      token: generateAuthToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;

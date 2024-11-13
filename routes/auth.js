const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // MongoDB user model
const authenticateToken = require('../middleware/auth');  // JWT middleware
const router = express.Router();

// Signup Route (User Registration)
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(201).json({ token });
});

// Login Route (User Authentication)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ token });
});

// Protected Profile Route (Only accessible if user is authenticated)
router.get('/profile', authenticateToken, async (req, res) => {
    // If the request passed the JWT verification, `req.user` will be populated
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ username: user.username, email: user.email });
});

module.exports = router;

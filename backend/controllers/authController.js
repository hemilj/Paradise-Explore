const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        console.log(req.body);
        console.log(req.file);

        const { uname, email, pass, mobno, gen, dob, state, city, pin } = req.body;
        const photo = req.file ? req.file.path : null;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = await User.create({
            uname,
            email,
            pass,
            mobno,
            gen,
            dob,
            state,
            city,
            pin,
            photo
        });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(201).json({
            _id: user._id,
            uname: user.uname,
            email: user.email,
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { email, pass } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check password using model method
        const isMatch = await user.matchPassword(pass);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.json({
            _id: user._id,
            uname: user.uname,
            email: user.email,
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser
};
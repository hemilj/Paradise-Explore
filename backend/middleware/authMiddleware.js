const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

/**
 * protect — verifies the JWT token from the Authorization header.
 * Attaches the authenticated user (without password) to req.user.
 * Use on any route that requires the user to be logged in.
 */
const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extract token from "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to request (exclude password)
            req.user = await User.findById(decoded.id).select('-pass');

            if (!req.user) {
                return res.status(401).json({ message: 'User not found, authorization denied' });
            }

            next();
        } catch (error) {
            console.error('Auth Middleware Error:', error.message);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

module.exports = { protect };

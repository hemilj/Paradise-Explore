const express = require('express');
const { allUser, blockUser } = require('../controllers/authController');
const router = express.Router();

// Get all users
router.get(
    '/',
    allUser
);

// Block User
router.put(
    '/block/:id',
    blockUser
)

module.exports = router;
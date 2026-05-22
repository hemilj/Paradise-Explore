const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerAgency, approveAgency, rejectAgency, checkAgent, checkEmail, resetPassword, agentLogin } = require('../controllers/controllAgency');
const Agency = require('../models/Agency');

// Register
router.post(
    '/register',
    [
        body('userId')
            .notEmpty()
            .withMessage('User ID is required'),
        body('nameAgency')
            .notEmpty()
            .withMessage('Agency name is required'),
        body('gstNumber')
            .optional(),
        body('authorName')
            .notEmpty()
            .withMessage('Author name is required'),
        body('designation')
            .notEmpty()
            .withMessage('Designation is required'),
        body('agencyEmail')
            .notEmpty()
            .withMessage('Agency email is required'),
        body('phoneNo')
            .notEmpty()
            .withMessage('Phone number is required'),
        body('officeAdd')
            .notEmpty()
            .withMessage('Office address is required'),
    ],

    registerAgency
);

// Approval Agency
router.put(
    '/approval/:id',
    approveAgency
);

// Rejection Agency
router.put(
    '/rejection/:id',
    rejectAgency
);

// Check Agent
router.get(
    '/check/:userId',
    checkAgent
);

router.post('/checkEmail',
    [
        body('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Invalid email format')
    ]
    ,
    checkEmail
);

router.post('/resetPassword',
    [
        body('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Invalid email format'),
        body('password')
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
    ],
    resetPassword
);

// Agent Login
router.post(
    '/agentLogin',
    [
        body('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Please include a valid email'),

        body('password')
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters'),
    ],
    agentLogin
);

// Agent List for Approval
router.get(
    '/agent',
    async (req, res) => {
        try {
            const agents = await Agency.find();
            res.json(agents);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
)

module.exports = router;
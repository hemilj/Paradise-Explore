const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerAgency } = require('../controllers/controllAgency');
const Agency = require('../models/Agency');

// Register
router.post(
    '/register',
    [
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
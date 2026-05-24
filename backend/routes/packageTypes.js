const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const PackageType = require('../models/PackageTypes');

router.post(
    '/add',
    [
        body('agentID')
            .notEmpty()
            .withMessage('Agent ID is required'),

        body('type_name')
            .notEmpty()
            .withMessage('Package type name is required'),

        body('description')
            .notEmpty()
            .withMessage('Description is required'),

        body('status')
            .notEmpty()
            .withMessage('Status is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { type_name, description, status, agentID } = req.body;

            // Check if package type already exists
            const existType = await PackageType.findOne({ type_name });
            if (existType) {
                return res.status(400).json({ message: 'Package type name already exists' });
            }

            const packageType = await PackageType.create({
                agentID,
                type_name,
                description,
                status,
            });
            res.status(201).json(packageType);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }
);

module.exports = router;
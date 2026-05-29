const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const PackageType = require('../models/PackageTypes');
const multer = require('multer')
const path = require('path')

// ── Multer: disk storage for package images ──────────────────────────────────
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'type-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png|gif|webp/;
        allowed.test(path.extname(file.originalname).toLowerCase())
            ? cb(null, true)
            : cb(new Error('Only image files are allowed!'));
    }
});

router.post(
    '/add',
    upload.single('image'),
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
            const image = req.file.filename;

            // Check if package type already exists
            const existType = await PackageType.findOne({ type_name });
            if (existType) {
                return res.status(400).json({ message: 'Package type name already exists' });
            }

            const packageType = await PackageType.create({
                agentID,
                type_name,
                description,
                image,
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
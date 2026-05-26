const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

const {
    createPackage,
    getPackagesByAgent,
    getPackageById,
    updatePackageStatus,
} = require('../controllers/controllPackages');

// ── Multer: disk storage for package images ──────────────────────────────────
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'pkg-' + uniqueSuffix + path.extname(file.originalname));
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

// ── Validation rules for creating a package ───────────────────────────────────
const packageValidation = [
    body('agentID').notEmpty().withMessage('Agent ID is required'),
    body('package_title').notEmpty().withMessage('Package title is required'),
    body('type_id').notEmpty().withMessage('Package type is required'),
    body('destination').notEmpty().withMessage('Destination is required'),
    body('duration').notEmpty().withMessage('Duration is required'),
];

// ── Routes ────────────────────────────────────────────────────────────────────
router.post('/add', upload.array('package_images[]', 20), packageValidation, createPackage);
router.get('/agent/:agentID', getPackagesByAgent);
router.get('/:id', getPackageById);
router.put('/:id/status', updatePackageStatus);

module.exports = router;

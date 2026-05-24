const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const PackageTypes = require('../models/PackageTypes');

router.get(
    '/users',
    async (req, res) => {
        try {
            const data = await User.find();
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

router.get(
    '/package-types',
    async (req, res) => {
        try {
            const data = await PackageTypes.find();
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const PackageTypes = require('../models/PackageTypes');
const Package = require('../models/Package');

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

router.get(
    '/packages',
    async (req, res) => {
        try {
            const data = await Package.find()
                .populate('agentID', 'nameAgency')
                .populate('type_id', 'type_name');
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

router.get(
    '/types',
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
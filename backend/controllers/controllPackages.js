const { validationResult } = require('express-validator');
const Package = require('../models/Package');

// ── POST: Create a new package ───────────────────────────────────────────────
const createPackage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {
            agentID,
            package_title,
            type_id,
            destination,
            duration,
            overview,
            inclusions,
            exclusions,
        } = req.body;

        // ── Parse itinerary & batches from JSON strings ──────────────────
        // Frontend serializes state arrays as JSON for reliable transmission
        let itinerary = [];
        let batches   = [];

        try {
            itinerary = JSON.parse(req.body.itinerary || '[]');
        } catch (e) {
            itinerary = [];
        }

        try {
            batches = JSON.parse(req.body.batches || '[]');
        } catch (e) {
            batches = [];
        }

        // Ensure proper numeric types in batches
        batches = batches.map(b => ({
            start_date:      new Date(b.start_date),
            end_date:        new Date(b.end_date),
            price:           Number(b.price),
            max_people:      Number(b.max_people),
            available_seats: Number(b.available_seats),
        }));

        // Uploaded image paths (from multer)
        const images = req.files ? req.files.map(f => f.filename) : [];

        const newPackage = await Package.create({
            agentID,
            package_title,
            type_id,
            destination,
            duration,
            overview:   overview   || '',
            inclusions: inclusions || '',
            exclusions: exclusions || '',
            images,
            itinerary,
            batches,
        });

        res.status(201).json({
            message: 'Package created successfully',
            package: newPackage,
        });

    } catch (error) {
        console.error('Package create error:', error);
        res.status(500).json({ message: error.message });
    }
};

// ── GET: All packages by a specific agent ────────────────────────────────────
const getPackagesByAgent = async (req, res) => {
    try {
        const packages = await Package.find({ agentID: req.params.agentID })
            .populate('type_id', 'type_name')
            .sort({ createdAt: -1 });
        res.json(packages);
    } catch (error) {
        console.error('Fetch packages error:', error);
        res.status(500).json({ message: error.message });
    }
};

// ── GET: Single package by ID ────────────────────────────────────────────────
const getPackageById = async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id)
            .populate('type_id', 'type_name');

        if (!pkg) {
            return res.status(404).json({ message: 'Package not found' });
        }

        res.json(pkg);
    } catch (error) {
        console.error('Fetch package by ID error:', error);
        res.status(500).json({ message: error.message });
    }
};

// ── PUT: Update Package Status and Commission ─────────────────────────────────
const updatePackageStatus = async (req, res) => {
    try {
        const { status, commission } = req.body;
        const updatedPackage = await Package.findByIdAndUpdate(
            req.params.id,
            { status, commission },
            { new: true }
        );

        if (!updatedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }

        res.json({ message: 'Package updated successfully', package: updatedPackage });
    } catch (error) {
        console.error('Update package status error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPackage, getPackagesByAgent, getPackageById, updatePackageStatus };

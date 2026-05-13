const Agency = require('../models/Agency');
const { validationResult } = require('express-validator');

const registerAgency = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { nameAgency,
        gstNumber,
        authorName,
        designation,
        agencyEmail,
        phoneNo,
        officeAdd } = req.body;

    const existAgency = await Agency.findOne({ agencyEmail });
    if (existAgency) return res.status(400).json({ msg: 'Agency is registered' });

    try {
        const agency = Agency.create({
            nameAgency,
            gstNumber,
            authorName,
            designation,
            agencyEmail,
            phoneNo,
            officeAdd,
            status: 'pending'
        });

        res.status(201).json({ msg: 'Agency registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerAgency };
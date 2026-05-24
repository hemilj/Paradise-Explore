const Agency = require('../models/Agency');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const registerAgency = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { userId,
        nameAgency,
        gstNumber,
        authorName,
        designation,
        agencyEmail,
        phoneNo,
        officeAdd } = req.body;

    const existAgency = await Agency.findOne({ agencyEmail });
    if (existAgency) return res.status(400).json({ msg: 'Agency is already registered' });

    try {
        const agency = Agency.create({
            userID: userId,
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

const approveAgency = async (req, res) => {
    try {
        const { id } = req.params;

        // Find agency
        const agency = await Agency.findById(id);

        if (!agency) {
            return res.status(404).json({
                success: false,
                message: 'Agency not found'
            });
        }

        // Generate random password
        const randomPassword = Math.random().toString(36).slice(-8);

        // Hash password
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        // Update agency
        agency.status = 'approved';
        agency.pass = hashedPassword;

        await agency.save();

        // TEMP: print password in console
        console.log("Agency Password:", randomPassword);

        res.status(200).json({
            success: true,
            message: 'Agency approved successfully',
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

const rejectAgency = async (req, res) => {
    const { id } = req.params;

    try {
        const agency = await Agency.findById(id);
        if (!agency) return res.status(404).json({ msg: 'Agency not found' });

        agency.status = 'rejected';
        await agency.save();

        res.status(200).json({ msg: 'Agency rejected successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const checkAgent = async (req, res) => {
    const { userId } = req.params;

    try {
        const agent = await Agency.findOne({ userID: userId });
        if (!agent) return res.status(404).json({ msg: 'Agent not found' });
        res.status(200).json({ isAgent: true, status: agent.status });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const agentLogin = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {
        const { email, password } = req.body;

        const agent = await Agency.findOne({ agencyEmail: email });

        if (!agent) {
            return res.status(404).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, agent.pass);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        res.status(200).json({ success: true, token: "agent123", nameAgency: agent.nameAgency, agentID: agent._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}

// CHECK EMAIL
const checkEmail = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {

        const { email } = req.body;

        const user = await Agency.findOne({ agencyEmail: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Email not recognized'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Email found'
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};



// RESET PASSWORD
const resetPassword = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {

        const { email, password } = req.body;

        const user = await Agency.findOne({ agencyEmail: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password
        user.pass = hashedPassword;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    registerAgency, approveAgency, rejectAgency, checkAgent,
    checkEmail,
    resetPassword,
    agentLogin
};
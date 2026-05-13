const mongoose = require('mongoose');

const AgencySchema = new mongoose.Schema({
    nameAgency: {
        type: String,
        required: true
    },
    gstNumber: {
        type: String,
        unique: true
    },
    authorName: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    agencyEmail: {
        type: String,
        unique: true,
        required: true
    },
    phoneNo: {
        type: String,
        unique: true,
        required: true
    },
    officeAdd: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Agency', AgencySchema);
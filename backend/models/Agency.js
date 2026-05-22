const mongoose = require('mongoose');

const AgencySchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
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
    pass: {
        type: String,
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
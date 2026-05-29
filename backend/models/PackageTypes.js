const mongoose = require('mongoose');

const PackageTypeSchema = mongoose.Schema({
    agentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agency',
        required: true
    },
    type_name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['1', '0'],
        default: '1'
    }
}, { timestamps: true });

module.exports = mongoose.model('PackageType', PackageTypeSchema);
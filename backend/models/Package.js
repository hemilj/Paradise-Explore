const mongoose = require('mongoose');

// Sub-schema: one itinerary day
const ItineraryDaySchema = new mongoose.Schema({
    day_number: { type: Number, required: true },
    day_title: { type: String, required: true },
    day_desc: { type: String, required: true },
}, { _id: false });

// Sub-schema: one departure batch with pricing
const BatchSchema = new mongoose.Schema({
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    price: { type: Number, required: true },
    max_people: { type: Number, required: true },
    available_seats: { type: Number, required: true },
}, { _id: false });

const PackageSchema = new mongoose.Schema({
    agentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agency',
        required: true,
    },
    package_title: {
        type: String,
        required: true,
        trim: true,
    },
    type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PackageType',
        required: true,
    },
    destination: {
        type: String,
        required: true,
        trim: true,
    },
    duration: {
        type: String,
        required: true,
        trim: true,
    },
    overview: {
        type: String,
        default: '',
    },
    inclusions: {
        type: String,
        default: '',
    },
    exclusions: {
        type: String,
        default: '',
    },
    images: {
        type: [String],
        default: [],
    },
    itinerary: {
        type: [ItineraryDaySchema],
        default: [],
    },
    batches: {
        type: [BatchSchema],
        default: [],
    },
    commission: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
}, { timestamps: true });

module.exports = mongoose.model('Package', PackageSchema);

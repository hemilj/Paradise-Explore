const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        uname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        pass: {
            type: String,
            required: true
        },
        mobno: {
            type: String,
            required: true
        },
        gen: {
            type: String,
            required: true
        },
        dob: {
            type: Date,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        pin: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: false,
            default: null
        },
        role: {
            type: String,
            enum: ["User", "Agent", "User/Agent"],
            default: "User"
        },
        status: {
            type: String,
            default: 'active'
        }
    },
    { timestamps: true }
);

// Hash password before save
userSchema.pre('save', async function () {

    if (!this.isModified('pass')) return;

    const salt = await bcrypt.genSalt(10);

    this.pass = await bcrypt.hash(this.pass, salt);
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.pass);
};

module.exports = mongoose.model('User', userSchema);

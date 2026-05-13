const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const multer = require('multer');

const registerUser = require('../controllers/authController').registerUser;
const loginUser = require('../controllers/authController').loginUser;
const { protect } = require('../middleware/authMiddleware');

// STORAGE CONFIG
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// MULTER
const upload = multer({
    storage: storage
});

// REGISTER ROUTE
router.post(
    '/register',

    // FIRST multer (wrapped for Express v5 compatibility)
    upload.single('photo'),

    // THEN validations
    [
        body('uname')
            .notEmpty()
            .withMessage('Name is required'),

        body('email')
            .isEmail()
            .withMessage('Please include a valid email'),

        body('pass')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters'),

        body('mobno')
            .notEmpty()
            .withMessage('Mobile number is required'),

        body('gen')
            .notEmpty()
            .withMessage('Gender is required'),

        body('dob')
            .notEmpty()
            .withMessage('Date of birth is required'),

        body('state')
            .notEmpty()
            .withMessage('State is required'),

        body('city')
            .notEmpty()
            .withMessage('City is required'),

        body('pin')
            .notEmpty()
            .withMessage('Pin code is required')
    ],

    registerUser
);

router.post(
    '/login',
    [
        body('email')
            .isEmail()
            .withMessage('Please include a valid email'),

        body('pass')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters'),
    ],
    loginUser
);


// PROTECTED ROUTE — Get current logged-in user profile
// Usage: GET /api/auth/me  with  Authorization: Bearer <token>
router.get('/me', protect, async (req, res) => {
    res.json({
        _id: req.user._id,
        uname: req.user.uname,
        email: req.user.email,
        mobno: req.user.mobno,
        gen: req.user.gen,
        dob: req.user.dob,
        state: req.user.state,
        city: req.user.city,
        pin: req.user.pin,
        photo: req.user.photo,
    });
});

module.exports = router;
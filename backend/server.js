const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');
const { allUser } = require('./controllers/authController');

dotenv.config();

const app = express();

app.use(cors());

// BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static folder for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
connectDB();

// Define Routes
app.use('/users', allUser)
app.use('/api/auth', require('./routes/authUser'));
app.use('/api/agency', require('./routes/authAgency'));

// Global Error Handler
app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message
    });
});

// Test Route
app.get('/', (req, res) => {
    res.send("Hello World");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(cors());

// BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Define Routes
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
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db')

const app = express();

// JSON parse middleware
app.use(express.json());

// CORS middleware
const corsOption = {
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOption));

// Database connection check
db();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
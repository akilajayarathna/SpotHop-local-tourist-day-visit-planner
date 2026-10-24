require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db')
const placesRoute = require('./routes/placesRoutes');
const categoriesRoute = require('./routes/categoryRoutes');

const app = express();

// JSON parse middleware
app.use(express.json());

// CORS middleware
const corsOption = {
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOption));
//app.use(cors());

// Database connection check
db();

// base url
app.use('/api', placesRoute);
app.use('/api', categoriesRoute);


// server configuration
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
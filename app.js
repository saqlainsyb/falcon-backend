const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

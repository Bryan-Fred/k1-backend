const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads directory

// Routes
app.use('/products', productRoutes);
app.use('/upload', uploadRoutes); // Add the upload routes

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

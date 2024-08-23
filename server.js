const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet'); // Helmet for securing HTTP headers
const morgan = require('morgan'); // Morgan for logging requests
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const { protect } = require('./middleware/authMiddleware'); // Import protect middleware

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet()); // Add Helmet to enhance security
app.use(morgan('dev')); // Add Morgan for logging requests

// CORS configuration to allow access from any origin
app.use(cors());

app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads directory

// Routes
app.use('/api/auth', authRoutes); // Add the authentication routes
app.use('/api/products', productRoutes); // Adjusted to /api/products for consistency
app.use('/api/upload', uploadRoutes); // Adjusted to /api/upload for consistency

// Example of a protected route
app.get('/api/protected', protect, (req, res) => {
  res.send('This is a protected route');
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const paymentRoutes = require('./routes/PaymentRoutes');
const foodRoutes = require('./routes/foodroutes');
const authRoutes = require('./routes/auth');  // Import the auth routes

// Initialize app
const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/payments', paymentRoutes);
app.use('/api/foods', foodRoutes);
// Use auth routes for authentication
app.use('/api/auth', authRoutes);  // Now /api/auth/signup and /api/auth/login will be available
// Default Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start Server
const PORT = 5000; // Define the server port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

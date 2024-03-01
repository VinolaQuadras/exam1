const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./Routes/authRoutes');
const foodRoutes = require('./Routes/foodRoutes');
const orderRoutes = require('./Routes/orderRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/order', orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
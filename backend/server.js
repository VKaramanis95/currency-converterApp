require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const currencyRoutes = require('./routes/currencyRoutes');
const connectDB = require('./config/db');
const conversionRoutes = require('./routes/conversionRoutes'); // Ensure this is present


const app = express();
app.use(express.json());


connectDB();
console.log('Mongo URI:', process.env.MONGO_URI);

app.use('/api/auth', authRoutes); // Auth routes
app.use('/api/currency', currencyRoutes); // Currency routes

app.use('/api/conversion', conversionRoutes); // Conversion routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
